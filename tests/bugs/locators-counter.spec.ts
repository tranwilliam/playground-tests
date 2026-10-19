import { expect, test } from '@playwright/test';

test('Add 1 adds 1', async ({ page }) => {
  await page.goto('/playground/locators/');
  await page.getByRole('button', { name: 'Add 1' }).click();
  await expect(page.locator('#counter-value')).toHaveText('1');
});
