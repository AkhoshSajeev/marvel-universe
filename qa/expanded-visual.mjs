import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
await page.goto("http://localhost:5173/marvel-universe/", {
  waitUntil: "networkidle",
});
await page.screenshot({ path: "qa/expanded-desktop-hero.png" });
await page.locator("#avengers-title").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: "qa/expanded-desktop-roster.png" });
await page
  .getByRole("button", { name: "Explore Iron Man, Tony Stark", exact: true })
  .hover();
await page.screenshot({ path: "qa/expanded-desktop-hover.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:5173/marvel-universe/", {
  waitUntil: "networkidle",
});
await page.screenshot({ path: "qa/expanded-mobile-hero.png" });
await page.locator("#avengers-title").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: "qa/expanded-mobile-roster.png" });
await page.setViewportSize({ width: 320, height: 760 });
await page.goto("http://localhost:5173/marvel-universe/", {
  waitUntil: "networkidle",
});
await page.screenshot({ path: "qa/expanded-small-hero.png" });
await browser.close();
console.log("Saved six expanded UI screenshots.");
