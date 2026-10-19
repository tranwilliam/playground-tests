import { expect, test } from '@playwright/test';

test('signs in the practice account and names an empty username', async ({ page }) => {
  await page.goto('/playground/sign-in/');
  await page.getByLabel('Username').fill('tester');
  await page.getByLabel('Password').fill('practice-only');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('#sign-in-result')).toHaveText('Signed in as tester. This session stays in the browser.');

  await page.getByLabel('Username').fill('');
  await page.getByLabel('Password').fill('');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('#username-error')).toHaveText('Enter a username.');
});
