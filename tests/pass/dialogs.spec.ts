import { expect, test } from '@playwright/test';

test('opens a notice and returns focus when it closes', async ({ page }) => {
  await page.goto('/playground/dialogs/');
  const opener = page.getByRole('button', { name: 'Open notice' });
  await opener.click();
  await expect(page.getByRole('dialog', { name: 'Practice notice' })).toBeVisible();
  await page.getByRole('button', { name: 'Close notice' }).click();
  await expect(page.getByRole('dialog', { name: 'Practice notice' })).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(page.locator('#dialog-result')).toHaveText('Notice closed.');
});
