import { expect, test } from "@playwright/test";

test("floating navigation exposes eight chapters, shrinks, and isolates the mobile menu", async ({
  page,
}) => {
  await page.goto("./");
  const nav = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  await expect(nav.getByRole("link")).toHaveCount(8);
  await expect(nav.getByRole("link")).toHaveText([
    "HOME",
    "HEROES",
    "AVENGERS",
    "TIMELINE",
    "MOVIES",
    "VILLAINS",
    "INFINITY SAGA",
    "MARVEL CONNECTIONS",
  ]);
  await page.locator("#avengers").scrollIntoViewIfNeeded();
  await expect(page.locator(".floating-nav")).toHaveClass(/nav-compact/);
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const menu = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(menu.getByRole("link")).toHaveCount(11);
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  }
});

test("motion preference persists, respects OS settings, and sound starts off", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  await expect(
    page.getByRole("button", { name: "Turn ambient sound on" }),
  ).toHaveAttribute("aria-pressed", "false");
  await page
    .getByRole("button", { name: "Reduce motion", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".ambient-canvas")).not.toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Use device motion preference" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Use device motion preference" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await page.getByRole("button", { name: "Turn ambient sound on" }).click();
  await expect(
    page.getByRole("button", { name: "Turn ambient sound off" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Turn ambient sound on" }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("constrained devices automatically simplify animation", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 2 }),
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("data-quality", "economy");
  await expect(page.locator(".ambient-canvas")).not.toBeVisible();
  await page
    .getByRole("button", { name: "Explore Iron Man, Tony Stark", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveAccessibleName("Iron Man");
});

test("five taps unlock a lazy-loaded archive and the secret keys work outside inputs", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("./");
  expect(requests.some((url) => /ClassifiedArchive-.*\.js/.test(url))).toBe(
    false,
  );
  const seal = page.getByRole("button", { name: "Avengers archive seal" });
  for (let i = 0; i < 5; i++) await seal.click();
  await expect(page.getByRole("dialog")).toHaveAccessibleName(
    "THERE WAS AN IDEA.",
  );
  expect(requests.some((url) => /ClassifiedArchive-.*\.js/.test(url))).toBe(
    true,
  );
  await page.getByRole("button", { name: /NEXT ARCHIVE NOTE/ }).click();
  await expect(page.getByRole("dialog")).toContainText("02");
  await page.keyboard.press("Escape");
  await expect(seal).toBeFocused();
  for (const key of [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ])
    await page.keyboard.press(key);
  await expect(page.getByRole("dialog")).toHaveAccessibleName(
    "THERE WAS AN IDEA.",
  );
  await page.keyboard.press("Escape");
  await page
    .getByRole("searchbox", { name: "Search characters" })
    .fill("upupdowndownleftrightleftrightba");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("missing artwork becomes a clearly labeled local placeholder", async ({
  page,
}) => {
  await page.route("**/assets/optimized/iron-man.webp", (route) =>
    route.abort(),
  );
  await page.goto("./");
  const portrait = page.locator(".character-portal").first().locator("img");
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute(
    "src",
    /assets\/artwork-placeholder.svg$/,
  );
  await expect
    .poll(() =>
      portrait.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
});
