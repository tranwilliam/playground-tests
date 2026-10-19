import { expect, test } from '@playwright/test';

test('saves the report by its visible name', async ({ page }) => {
  await page.goto('/playground/locators/');
  await page.getByRole('button', { name: 'Save report', exact: true }).click();
  await expect(page.locator('#report-status')).toHaveText('Report saved.');
});
