import { expect, test } from "@playwright/test";

test("global Thor search reaches characters, films, locations, equipment and events", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("button", { name: "Search the universe", exact: true })
    .click();
  const input = page.getByRole("combobox", {
    name: "Search the Marvel Universe",
  });
  await expect(input).toBeFocused();
  await input.fill("Thor");
  const results = page.getByRole("listbox", { name: "Archive search results" });
  for (const text of [
    "Thor",
    "Thor: Ragnarok",
    "The Avengers",
    "Avengers: Infinity War",
    "Avengers: Endgame",
    "Asgard",
    "Stormbreaker",
    "Mjolnir",
  ])
    await expect(
      results.getByRole("option").filter({ hasText: text }).first(),
    ).toBeVisible();
  await page
    .locator(".search-category-tabs")
    .getByRole("button", { name: "Locations", exact: true })
    .click();
  await expect(
    results.getByRole("option").filter({ hasText: "Asgard" }),
  ).toBeVisible();
  await results.getByRole("option").filter({ hasText: "Asgard" }).click();
  await expect(page.getByRole("dialog")).toHaveAccessibleName("Asgard");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Thor: Ragnarok", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveAccessibleName("Thor: Ragnarok");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Search the universe", exact: true }),
  ).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("global search supports keyboard selection, shortcut toggle and empty-result recovery", async ({
  page,
}) => {
  await page.goto("./");
  await page.keyboard.press("Control+k");
  const input = page.getByRole("combobox", {
    name: "Search the Marvel Universe",
  });
  await input.fill("Stormbreaker");
  await expect(page.getByRole("listbox").getByRole("option")).toHaveCount(3);
  await input.press("ArrowDown");
  await input.press("ArrowUp");
  await input.press("Enter");
  await expect(page.getByRole("dialog")).toHaveAccessibleName("Stormbreaker");
  await page.keyboard.press("Escape");
  await page.keyboard.press("Control+k");
  await input.fill("qqqxxyzz");
  await expect(page.getByText("No signal found.")).toBeVisible();
  await page.getByRole("button", { name: "RESET SEARCH", exact: true }).click();
  await expect(input).toHaveValue("");
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("all requested character categories filter a mixed archive with real mutant and villain files", async ({
  page,
}) => {
  await page.goto("./");
  const controls = page.locator(".character-filters");
  for (const name of [
    "ALL",
    "AVENGERS",
    "HEROES",
    "VILLAINS",
    "COSMIC",
    "MAGIC",
    "TECH",
    "SUPER SOLDIERS",
    "GODS",
    "MUTANTS",
  ])
    await expect(
      controls.getByRole("button", { name: new RegExp(`^${name}`) }),
    ).toBeVisible();
  await controls.getByRole("button", { name: /^VILLAINS/ }).click();
  await expect(page.locator(".character-grid .character-entry")).toHaveCount(9);
  await expect(page.locator(".character-grid")).toContainText("Thanos");
  await expect(page.locator(".character-grid")).not.toContainText("Tony Stark");
  await controls.getByRole("button", { name: /^MUTANTS/ }).click();
  await expect(page.locator(".character-grid .character-entry")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Explore Wolverine archive file" })
    .click();
  await expect(page.getByRole("dialog")).toHaveAccessibleName("Wolverine");
  await expect(page.getByRole("dialog")).toContainText("2024 film variant");
  await page.keyboard.press("Escape");
  await controls.getByRole("button", { name: /^SUPER SOLDIERS/ }).click();
  await expect(page.locator(".character-grid .character-entry")).toHaveCount(3);
  await controls.getByRole("button", { name: /^ALL/ }).click();
  await expect(page.locator(".character-grid .character-entry")).toHaveCount(
    27,
  );
});

test("gauntlet counts distinct stones, reveals information, completes once and resets", async ({
  page,
}) => {
  await page.goto("./");
  const section = page.locator("#gauntlet");
  await section
    .getByRole("button", { name: "Activate Space Stone", exact: true })
    .click();
  await section
    .getByRole("button", { name: "Activate Space Stone", exact: true })
    .click();
  await expect(section.locator(".artifact-progress")).toContainText("01 / 06");
  for (const name of ["Mind", "Reality", "Power", "Time", "Soul"]) {
    await section
      .getByRole("button", { name: `Activate ${name} Stone`, exact: true })
      .click();
    await expect(section.locator(".gauntlet-info h3")).toHaveText(
      `${name} Stone`,
    );
  }
  await expect(section.locator(".artifact-progress")).toContainText("06 / 06");
  await expect(page.locator(".gauntlet-cinematic")).toBeVisible();
  await expect(section.locator(".gauntlet-unlocked")).toContainText(
    "SYNCHRONIZED",
  );
  await section.getByRole("button", { name: "RESET EXPLORATION" }).click();
  await expect(section.locator(".artifact-progress")).toContainText("00 / 06");
  await expect(page.locator(".gauntlet-cinematic")).toHaveCount(0);
});

test("qualitative comparison changes both profiles, categories and swaps without numerical scores", async ({
  page,
}) => {
  await page.goto("./");
  const section = page.locator("#compare");
  await section
    .getByLabel("First comparison character")
    .selectOption("iron-man");
  await section.getByLabel("Second comparison character").selectOption("thor");
  await section
    .getByRole("button", { name: "Technology", exact: true })
    .click();
  await expect(section.locator(".comparison-reading")).toContainText(
    "nanotechnology",
  );
  await expect(section.locator(".comparison-reading")).toContainText(
    "Asgardian weapons",
  );
  await section
    .getByLabel("Second comparison character")
    .selectOption("scarlet-witch");
  await section.getByRole("button", { name: "Energy", exact: true }).click();
  await expect(section.locator(".comparison-reading")).toContainText(
    "Chaos magic",
  );
  await section
    .getByRole("button", { name: "Swap comparison characters" })
    .click();
  await expect(section.getByLabel("First comparison character")).toHaveValue(
    "scarlet-witch",
  );
  await expect(section.getByLabel("Second comparison character")).toHaveValue(
    "iron-man",
  );
  await expect(section.locator(".comparison-note")).toContainText(
    "No numerical ratings",
  );
  await expect(section.locator('[role="progressbar"]')).toHaveCount(0);
});

test("movie universe reveals the complete archive and opens connected cinematic details", async ({
  page,
}) => {
  await page.goto("./");
  const section = page.locator("#movies");
  await expect(section.locator(".universe-movie-card")).toHaveCount(12);
  for (let i = 0; i < 3; i++)
    await section.getByRole("button", { name: /REVEAL MORE CHAPTERS/ }).click();
  await expect(section.locator(".universe-movie-card")).toHaveCount(37);
  await section.getByLabel("Search movies").fill("Thor");
  await expect(section.locator(".universe-movie-card")).toHaveCount(8);
  await section
    .getByRole("button", { name: "View Thor: Ragnarok details", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAccessibleName("Thor: Ragnarok");
  await expect(dialog).toContainText("Valkyrie");
  await expect(
    dialog.getByRole("link", { name: "EXPLORE ON MARVEL.COM" }),
  ).toHaveAttribute("href", "https://www.marvel.com/movies/thor-ragnarok");
  await dialog
    .locator(".film-connections")
    .getByRole("button", { name: /Avengers: Infinity War/ })
    .click();
  await expect(dialog).toHaveAccessibleName("Avengers: Infinity War");
  await expect(
    dialog.getByRole("button", { name: "PLAY OFFICIAL TRAILER" }),
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("desktop cursor interpolates and shows action labels; reduced motion disables it", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  await page
    .getByRole("button", { name: "Explore Iron Man, Tony Stark", exact: true })
    .hover();
  await expect(page.locator(".cinematic-cursor")).toHaveAttribute(
    "data-label",
    "EXPLORE",
  );
  await expect(page.locator("html")).toHaveClass(/custom-cursor-on/);
  await page.locator(".universe-movie-card").first().hover();
  await expect(page.locator(".cinematic-cursor")).toHaveAttribute(
    "data-label",
    "VIEW",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/custom-cursor-on/);
  await expect(page.locator(".cinematic-cursor")).not.toBeVisible();
});

test("animated section transitions navigate and preserve keyboard access", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  await page
    .getByRole("link", { name: "EXPLORE THE MCU", exact: true })
    .click();
  await expect(page).toHaveURL(/#timeline$/);
  await expect(page.locator("#timeline")).toBeFocused();
  await expect(page.locator(".scene-wipe")).toHaveCSS("opacity", "0");
});

test("new features fit a 320px touch screen and the custom cursor remains off", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 320, height: 800 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/marvel-universe/");
  for (const id of ["gauntlet", "compare", "movies"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page
    .getByRole("button", { name: "Activate Mind Stone", exact: true })
    .tap();
  await expect(page.locator("#gauntlet .artifact-progress")).toContainText(
    "01 / 06",
  );
  await expect(page.locator("html")).not.toHaveClass(/custom-cursor-on/);
  await page
    .getByRole("button", { name: "Search the universe", exact: true })
    .tap();
  await page
    .getByRole("combobox", { name: "Search the Marvel Universe" })
    .fill("Wakanda");
  await expect(page.getByRole("listbox")).toContainText("Wakanda");
  expect(
    await page
      .getByRole("dialog")
      .evaluate((e) => e.scrollWidth <= e.clientWidth),
  ).toBe(true);
  await context.close();
});
