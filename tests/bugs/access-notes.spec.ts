import { expect, test } from '@playwright/test';

test('a member cannot read another person\'s note or the staff report', async ({ page }) => {
  await page.goto('/playground/access/');
  await page.getByLabel('Username').fill('member');
  await page.getByLabel('Password').fill('practice-only');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByLabel('Note id').fill('u-editor');
  await page.getByRole('button', { name: 'Open note' }).click();
  await expect(page.locator('#note-result')).toHaveText('This note belongs to someone else.');

  await page.getByRole('button', { name: 'Request staff report' }).click();
  await expect(page.locator('#staff-result')).toHaveText('The staff report is for an admin.');
});
