import { test, expect } from "@playwright/test";

test("should navigate to the about page", async ({ page }) => {
  await page.goto("/");

  await page.click("text=Photo");

  await expect(page).toHaveURL("http://localhost:3000/sub/photo");

  await expect(page).toHaveScreenshot();
});
