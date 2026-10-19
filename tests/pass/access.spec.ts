import { expect, test } from '@playwright/test';

test('signs in a member and keeps the staff report hidden', async ({ page }) => {
  await page.goto('/playground/access/');
  await page.getByLabel('Username').fill('member');
  await page.getByLabel('Password').fill('practice-only');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('#access-role')).toHaveText('Signed in as member (u-member).');
  await expect(page.locator('#open-staff')).toBeHidden();
});
