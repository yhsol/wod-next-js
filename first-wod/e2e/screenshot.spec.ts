import { test, expect } from "@playwright/test";

test("photo page test", async ({ page }) => {
  await page.evaluate(() => document.fonts.ready);

  await page.goto("/");

  await page.click("text=Photo");

  await expect(page).toHaveURL("http://localhost:3000/sub/photo");

  await expect(page).toHaveScreenshot();
});
