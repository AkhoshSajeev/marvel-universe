import { expect, test } from "@playwright/test";

const heroButton = "Explore Iron Man, Tony Stark";

test("production entry point and local artwork work under the GitHub Pages base path", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  const failedLocalResponses: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("response", (response) => {
    if (
      response.url().startsWith("http://127.0.0.1:4173/") &&
      response.status() >= 400
    ) {
      failedLocalResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("./");
  await expect(page).toHaveTitle("Marvel Universe — The Avengers");
  await expect(
    page.getByRole("button", { name: /^Explore .*?, / }),
  ).toHaveCount(6);
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
    await expect(image).toHaveAttribute("src", /^\/marvel-universe\/images\//);
  }
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      document.fonts.check('800 40px "Barlow Condensed"'),
    ),
  ).toBe(true);
  expect(runtimeErrors).toEqual([]);
  expect(failedLocalResponses).toEqual([]);
});

test("character dossiers support button and arrow-key navigation with wraparound", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: heroButton }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAccessibleName("Iron Man");
  await expect(dialog.getByText("Robert Downey Jr.")).toBeVisible();

  await dialog.getByRole("button", { name: "Next Avenger" }).click();
  await expect(dialog).toHaveAccessibleName("Captain America");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toHaveAccessibleName("Iron Man");
  await dialog.getByRole("button", { name: "Previous Avenger" }).click();
  await expect(dialog).toHaveAccessibleName("Hawkeye");
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveAccessibleName("Iron Man");
});

test("dialogs trap keyboard focus and restore the opener and scrolling on Escape", async ({
  page,
}) => {
  await page.goto("./");
  const opener = page.getByRole("button", { name: heroButton });
  await opener.focus();
  await page.keyboard.press("Enter");
  const close = page.getByRole("button", { name: "Close dialog" });
  await expect(close).toBeFocused();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

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

test("roster filters select the appropriate heroes and restore the full team", async ({
  page,
}) => {
  await page.goto("./");
  const roster = page.locator("#avengers");
  const visibleHeroes = () => roster.getByRole("button", { name: /^Explore / });

  await page.getByRole("button", { name: /TECH & TACTICS/ }).click();
  await expect(visibleHeroes()).toHaveCount(3);
  await expect(roster.getByRole("button", { name: heroButton })).toBeVisible();
  await expect(
    roster.getByRole("button", { name: /Explore Black Widow/ }),
  ).toBeVisible();
  await expect(
    roster.getByRole("button", { name: /Explore Hawkeye/ }),
  ).toBeVisible();

  const enhanced = page.getByRole("button", { name: /SUPERHUMAN/ });
  await enhanced.click();
  await expect(enhanced).toHaveAttribute("aria-pressed", "true");
  await expect(visibleHeroes()).toHaveCount(3);
  await expect(
    roster.getByRole("button", { name: /Explore Captain America/ }),
  ).toBeVisible();
  await expect(
    roster.getByRole("button", { name: /Explore Thor/ }),
  ).toBeVisible();
  await expect(
    roster.getByRole("button", { name: /Explore Hulk/ }),
  ).toBeVisible();

  await page.getByRole("button", { name: /THE ORIGINAL SIX/ }).click();
  await expect(visibleHeroes()).toHaveCount(6);
  await expect(enhanced).toHaveAttribute("aria-pressed", "false");
});

test("the featured trailer opens the right film and creates a labeled player only on demand", async ({
  page,
}) => {
  // Verify our player integration without depending on YouTube availability or autoplay policy.
  await page.route("https://www.youtube-nocookie.com/embed/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<!doctype html><html><head><title>Trailer test player</title></head><body></body></html>",
    }),
  );
  await page.goto("./");
  const opener = page.getByRole("button", { name: "WATCH THE TRAILER" });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Avengers: Endgame" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("3h 01m")).toBeVisible();
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
  await expect(
    dialog.getByRole("link", { name: "OPEN TRAILER ON YOUTUBE" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=TcMBFSGVi1c");
  await dialog.getByRole("button", { name: "Close dialog" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("mobile menu restores focus on Escape and closes after navigating", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "The Avengers" }).focus();
  await page.keyboard.press("Escape");
  await expect(navigation).toHaveCount(0);
  const toggle = page.getByRole("button", { name: "Open navigation menu" });
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await navigation.getByRole("link", { name: "The Saga" }).click();
  await expect(navigation).toHaveCount(0);
  await expect(page).toHaveURL(/#saga$/);
  await expect(
    page.getByRole("heading", { name: "EVERY CHAPTER. EVERYTHING AT STAKE." }),
  ).toBeInViewport();
});

test("mobile menu closes when switching to a desktop viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 900, height: 1000 });
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("button", { name: "Open navigation menu" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("keyboard focus preserves card widths and does not overflow mobile and tablet pages", async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("./");
    await page
      .getByRole("link", { name: "Marvel Universe home", exact: true })
      .focus();
    const hero = page.getByRole("button", { name: heroButton });
    const restingWidth = await hero.evaluate(
      (element) => element.getBoundingClientRect().width,
    );
    await page.keyboard.press("Tab");
    await hero.focus();
    await expect(hero).toBeFocused();
    await expect
      .poll(() => hero.evaluate((element) => element.matches(":focus-visible")))
      .toBe(true);
    await expect
      .poll(() =>
        hero.evaluate((element) => element.getBoundingClientRect().width),
      )
      .toBeCloseTo(restingWidth, 0);
    expect(restingWidth).toBeGreaterThan(150);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  }
});
