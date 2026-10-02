import { expect, test } from "@playwright/test";

test("all 37 timeline chapters have valid posters and phase navigation preserves release ordering", async ({
  page,
}) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  const phaseCounts = [6, 6, 11, 7, 6, 1];
  for (let phase = 1; phase <= 6; phase++) {
    await page
      .getByRole("button", { name: new RegExp(`PHASE 0${phase}`) })
      .click();
    const films = page.locator(".film-rail button");
    await expect(films).toHaveCount(phaseCounts[phase - 1]);
    for (let i = 0; i < phaseCounts[phase - 1]; i++) {
      await films.nth(i).click();
      await expect(films.nth(i)).toHaveAttribute("aria-pressed", "true");
      const img = page.locator(".timeline-art img");
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (e: HTMLImageElement) => e.complete && e.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
  await expect(
    page.getByRole("button", { name: "Next film", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: /PHASE 01/ }).click();
  await expect(
    page.getByRole("button", { name: "Previous film", exact: true }),
  ).toBeDisabled();
  await page
    .locator(".film-connections")
    .getByRole("button", { name: /The Avengers/ })
    .click();
  await expect(page.locator(".timeline-story h3")).toHaveText("The Avengers");
  await page
    .locator(".film-characters")
    .getByRole("button", { name: "Iron Man", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  expect(errors).toEqual([]);
});

test("team lineups change their members and open the correct dossier", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "New Avengers", exact: true }).click();
  await expect(page.locator(".team-formation button")).toHaveCount(6);
  await expect(page.locator(".team-formation")).toContainText("Vision");
  await expect(page.locator(".team-formation")).not.toContainText("Tony Stark");
  await page.getByRole("button", { name: "Replay team formation" }).click();
  await page
    .getByRole("button", { name: "Open Vision from New Avengers" })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Vision");
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Endgame Allies", exact: true })
    .click();
  await expect(page.locator(".team-formation")).toContainText("Captain Marvel");
});

test("relationship graph filters, recenters, supports keyboard and recovers from empty results", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("button", { name: "Show Thor connections", exact: true })
    .click();
  await page
    .locator(".connection-filters")
    .getByRole("button", { name: "Family", exact: true })
    .click();
  await expect(page.locator(".network-stage svg line")).toHaveCount(1);
  await expect(page.locator(".network-details")).toContainText(
    "Adoptive brothers",
  );
  await page
    .getByRole("button", { name: "Focus network on Loki: Family", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".network-details h3")).toHaveText(
    "Loki Laufeyson",
  );
  await page
    .locator(".connection-filters")
    .getByRole("button", { name: "Mentor", exact: true })
    .click();
  await expect(page.locator(".network-empty")).toBeVisible();
  await page.getByRole("button", { name: "SHOW ALL CONNECTIONS" }).click();
  await expect(page.locator(".network-stage svg line")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Open Loki dossier", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("all villain files load and conflict links select the related timeline chapter", async ({
  page,
}) => {
  await page.goto("./");
  const villains = page.locator(".threat-selector>button");
  await expect(villains).toHaveCount(9);
  for (let i = 0; i < 9; i++) {
    await villains.nth(i).click();
    const img = page.locator(".threat-portrait>img");
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth > 0),
      )
      .toBe(true);
    await expect(page.locator(".threat-abilities li")).toHaveCount(3);
  }
  await expect(page.locator(".threat-intel")).toContainText(
    "UPCOMING DEC 18, 2026",
  );
  await page.getByRole("link", { name: "OFFICIAL DOOMSDAY PREVIEW" }).focus();
  await villains.filter({ hasText: "Ultron" }).click();
  await page
    .getByRole("button", { name: "EXPLORE THE CONFLICT", exact: true })
    .click();
  await expect(page).toHaveURL(/#timeline$/);
  await expect(page.locator(".timeline-story h3")).toHaveText(
    "Avengers: Age of Ultron",
  );
});

test("all six stones reveal distinct histories and the route to the gauntlet", async ({
  page,
}) => {
  await page.goto("./");
  for (const name of ["Space", "Mind", "Reality", "Power", "Time", "Soul"]) {
    await page
      .getByRole("button", { name: `Reveal ${name} Stone`, exact: true })
      .click();
    await expect(page.locator(".stone-detail h3")).toHaveText(`${name} Stone`);
    await expect(
      page.getByRole("button", { name: `Reveal ${name} Stone`, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".stone-thanos-link")).not.toBeEmpty();
  }
  await expect(page.locator(".stone-detail")).toContainText("Vormir");
  await expect(page.locator(".stone-detail")).toContainText("Gamora");
});

test("new cinematic sections stay contained and interactive at mobile widths", async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("./");
    for (const section of [
      "timeline",
      "teams",
      "connections",
      "threats",
      "infinity",
    ]) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page
      .getByRole("button", { name: "Reveal Time Stone", exact: true })
      .click();
    await expect(page.locator(".stone-detail h3")).toHaveText("Time Stone");
    await page
      .getByRole("button", { name: "Show Spider-Man connections", exact: true })
      .click();
    await expect(page.locator(".network-details h3")).toHaveText(
      "Peter Parker",
    );
  }
});

test("animated mobile chapters reveal correctly after content changes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  await page.getByRole("button", { name: /PHASE 06/ }).click();
  for (const id of ["teams", "connections", "threats", "infinity"]) {
    const heading = page.locator(`#${id}-title`);
    await heading.scrollIntoViewIfNeeded();
    await expect(heading.locator("xpath=../..")).toHaveCSS("opacity", "1");
  }
  await page.getByRole("button", { name: "New Avengers", exact: true }).click();
  const formation = page.getByRole("button", {
    name: "Open Vision from New Avengers",
  });
  await formation.scrollIntoViewIfNeeded();
  await expect(formation).toHaveCSS("opacity", "1");
  await page
    .locator("#infinity-title")
    .evaluate((e) => e.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.screenshot({ path: "qa/explorer-mobile-viewport.png" });
  await expect(page.locator(".skip-link")).not.toBeInViewport();
});
