import { expect, test } from '@playwright/test';

test('a click outside the delete dialog keeps the report', async ({ page }) => {
  await page.goto('/playground/dialogs/');
  await page.getByRole('button', { name: 'Delete report' }).click();
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page.mouse.click(8, 8);
  await expect(page.locator('#dialog-result')).toHaveText('Report kept.');
  await expect(page.getByRole('alertdialog')).toBeHidden();
});
