import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
await page.goto("http://localhost:5173/marvel-universe/", {
  waitUntil: "networkidle",
});
for (const width of [1440, 390]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const id of ["gauntlet", "compare", "movies"]) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await section.screenshot({
      path: `qa/interactive-${id}-${width}.png`,
      style: ".site-header,.skip-link {visibility:hidden!important}",
    });
  }
  await page
    .getByRole("button", { name: "Search the universe", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Search the Marvel Universe" })
    .fill("Thor");
  await page.waitForTimeout(250);
  await page.screenshot({ path: `qa/interactive-search-${width}.png` });
  await page.keyboard.press("Escape");
}
await browser.close();
console.log("Saved eight interactive chapter screenshots.");
