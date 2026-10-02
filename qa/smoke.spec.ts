import { expect, test } from "@playwright/test";

const ironMan = "Explore Iron Man, Tony Stark";

test("the cinematic entry point and all eighteen portraits load under the Pages base path", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (
      response.url().startsWith("http://127.0.0.1:4173/") &&
      response.status() >= 400
    )
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("./");
  await expect(page).toHaveTitle("Marvel Universe — The Avengers");
  await expect(
    page
      .locator("#overview")
      .getByRole("heading", { name: "THE AVENGERS", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".character-portal")).toHaveCount(18);
  await expect(
    page.getByRole("button", { name: / and watch trailer$/ }),
  ).toHaveCount(4);
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await expect(image).toHaveAttribute(
      "src",
      /^\/marvel-universe\/assets\/optimized\//,
    );
  }
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      document.fonts.check('800 40px "Barlow Condensed"'),
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("the two hero calls to action lead to the character archive and film saga", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("link", { name: "EXPLORE THE AVENGERS", exact: true })
    .click();
  await expect(page).toHaveURL(/#avengers$/);
  await expect(page.locator("#avengers-title")).toBeInViewport();
  await page
    .getByRole("link", { name: "Marvel Universe home", exact: true })
    .click();
  await page
    .getByRole("link", { name: "EXPLORE THE MCU", exact: true })
    .click();
  await expect(page).toHaveURL(/#timeline$/);
  await expect(page.locator("#timeline-title")).toBeInViewport();
});

test("character dossiers navigate the expanded roster and wrap correctly", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: ironMan }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAccessibleName("Iron Man");
  await expect(dialog.getByText("Robert Downey Jr.")).toBeVisible();
  await dialog.getByRole("button", { name: "Next Avenger" }).click();
  await expect(dialog).toHaveAccessibleName("Captain America");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toHaveAccessibleName("Iron Man");
  await dialog.getByRole("button", { name: "Previous Avenger" }).click();
  await expect(dialog).toHaveAccessibleName("Nick Fury");
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveAccessibleName("Iron Man");
});

test("full-screen dossiers trap focus, isolate the page, and restore the opener", async ({
  page,
}) => {
  await page.goto("./");
  const opener = page.getByRole("button", { name: ironMan });
  await opener.focus();
  await page.keyboard.press("Enter");
  const close = page.getByRole("button", { name: "Close dialog" });
  await expect(close).toBeFocused();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.locator(".app-shell")).toHaveAttribute("inert", "");
  await expect(page.getByRole("dialog")).toHaveAccessibleName("Iron Man");
  const bounds = await page.getByRole("dialog").boundingBox();
  expect(bounds?.width).toBeCloseTo(1440, 0);
  expect(bounds?.height).toBeCloseTo(1000, 0);
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Next Avenger" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("search and category filters work together and can recover from empty results", async ({
  page,
}) => {
  await page.goto("./");
  const cards = page.locator(".character-portal");
  await page.getByRole("button", { name: /ORIGINAL SIX/ }).click();
  await expect(cards).toHaveCount(6);
  const search = page.getByRole("searchbox", { name: "Search characters" });
  await search.fill("Tony");
  await expect(cards).toHaveCount(1);
  await expect(cards).toHaveAccessibleName(ironMan);
  await search.fill("Wanda");
  await expect(cards).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "No heroes found." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "RESET FILTERS" }).click();
  await expect(cards).toHaveCount(18);
  await search.fill("chaos");
  await expect(cards).toHaveCount(1);
  await expect(cards).toHaveAccessibleName(
    "Explore Scarlet Witch, Wanda Maximoff",
  );
  await page.getByRole("button", { name: "Clear character search" }).click();
  await expect(cards).toHaveCount(18);
});

test("ability nodes expose descriptions without numerical power rankings or hijacking keys", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: ironMan }).click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("navigation", { name: "Character sections" })
    .getByRole("button", { name: "Abilities" })
    .click();
  const ability = dialog.getByRole("button", {
    name: "Energy projection",
    exact: true,
  });
  await ability.click();
  await expect(ability).toHaveAttribute("aria-pressed", "true");
  await expect(dialog.locator("#experience-ability-description")).toContainText(
    "unibeam",
  );
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveAccessibleName("Iron Man");
  await expect(dialog.getByRole("progressbar")).toHaveCount(0);
  await expect(dialog.getByText(/FAN RATINGS|POWER PROFILE/)).toHaveCount(0);
});

test("equipment and timeline sections contain real details and horizontal controls work", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: ironMan }).click();
  const dialog = page.getByRole("dialog");
  const tabs = dialog.getByRole("navigation", { name: "Character sections" });
  await tabs.getByRole("button", { name: "Equipment" }).click();
  await expect(
    dialog.getByRole("heading", { name: "Arc Reactor", exact: true }),
  ).toBeInViewport();
  await tabs.getByRole("button", { name: "Story" }).click();
  const timeline = dialog.locator(".experience-timeline");
  await expect(timeline).toBeInViewport();
  await expect(timeline.locator(".experience-milestone")).toHaveCount(7);
  await expect(
    dialog.getByRole("button", { name: "Previous story milestone" }),
  ).toBeDisabled();
  await dialog.getByRole("button", { name: "Next story milestone" }).click();
  await expect
    .poll(() => timeline.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(100);
  await expect(
    dialog.getByRole("button", { name: "Previous story milestone" }),
  ).toBeEnabled();
  await timeline.focus();
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveAccessibleName("Iron Man");
});

test("Scarlet Witch includes the requested WandaVision abilities and dated story scope", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("searchbox", { name: "Search characters" })
    .fill("Wanda");
  await page
    .getByRole("button", { name: "Explore Scarlet Witch, Wanda Maximoff" })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".experience-snapshot")).toContainText(
    "WandaVision (2021)",
  );
  await expect(
    dialog.getByRole("button", { name: "Chaos magic", exact: true }),
  ).toHaveCount(1);
  await expect(
    dialog.getByRole("button", { name: "Reality manipulation", exact: true }),
  ).toHaveCount(1);
  await expect(
    dialog.getByRole("button", { name: "Telekinesis", exact: true }),
  ).toHaveCount(1);
});

test("movie trailers remain on demand and use the official accessible player", async ({
  page,
}) => {
  await page.route("https://www.youtube-nocookie.com/embed/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<!doctype html><html><head><title>Trailer test</title></head><body></body></html>",
    }),
  );
  await page.goto("./");
  const opener = page.getByRole("button", {
    name: "Explore Avengers: Endgame and watch trailer",
  });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Avengers: Endgame" });
  await expect(dialog.locator("iframe")).toHaveCount(0);
  await dialog.getByRole("button", { name: "PLAY OFFICIAL TRAILER" }).click();
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "title",
    "Avengers: Endgame official trailer",
  );
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "src",
    "https://www.youtube-nocookie.com/embed/TcMBFSGVi1c?autoplay=1&rel=0",
  );
  await dialog.getByRole("button", { name: "Close dialog" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("mobile navigation restores focus and closes on navigation or desktop resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await menu.getByRole("link", { name: /HEROES/ }).focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Open navigation menu" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await menu.getByRole("link", { name: /INFINITY SAGA/ }).click();
  await expect(menu).toHaveCount(0);
  await expect(page).toHaveURL(/#infinity$/);
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(menu).toHaveCount(0);
});

test("mobile full-screen character sections stay inside the viewport and close from any depth", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  await page.getByRole("button", { name: ironMan }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAccessibleName("Iron Man");
  const bounds = await dialog.boundingBox();
  expect(bounds?.width).toBeCloseTo(390, 0);
  expect(bounds?.height).toBeCloseTo(844, 0);
  await dialog
    .getByRole("navigation", { name: "Character sections" })
    .getByRole("button", { name: "Abilities" })
    .click();
  await expect(dialog.locator(".experience-constellation")).toBeInViewport();
  expect(
    await dialog.evaluate(
      (element) => element.scrollWidth <= element.clientWidth,
    ),
  ).toBe(true);
  await dialog
    .getByRole("navigation", { name: "Character sections" })
    .getByRole("button", { name: "Story" })
    .click();
  await expect(dialog.locator(".experience-timeline")).toBeInViewport();
  const close = dialog.getByRole("button", { name: "Close dialog" });
  await expect(close).toBeInViewport();
  await close.click();
  await expect(dialog).toHaveCount(0);
});

test("responsive cards and the cinematic hero have no page overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("./");
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: ironMan }).focus();
    const widthBefore = await page
      .getByRole("button", { name: ironMan })
      .evaluate((element) => element.getBoundingClientRect().width);
    expect(widthBefore).toBeGreaterThan(150);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  }
});
