import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
await page.goto("http://localhost:5173/marvel-universe/", {
  waitUntil: "networkidle",
});
for (const width of [1440, 390, 320]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const id of [
    "timeline",
    "teams",
    "connections",
    "threats",
    "infinity",
  ]) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await section.screenshot({ path: `qa/explorer-${id}-${width}.png` });
  }
}
await browser.close();
console.log("Saved 15 universe chapter screenshots.");
