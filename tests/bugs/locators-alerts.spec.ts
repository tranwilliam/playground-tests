import { expect, test } from '@playwright/test';

test('turning alerts on sets aria-pressed to true', async ({ page }) => {
  await page.goto('/playground/locators/');
  const toggle = page.locator('#toggle-alerts');
  await expect(toggle).toHaveText('Alerts off');
  await toggle.click();
  await expect(toggle).toHaveText('Alerts on');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});
