import { expect, step, test } from '../shared/fixtures';
import { signUp } from './helpers';

// Forgot password: https://www.theqaiguy.com/qaflix/forgot/
// Reset only works for an email that already exists in this browser.

test('a member can set a new password and sign in with it', async ({ page, qaflixAccount }) => {
  await step('Create an account', async () => {
    await signUp(page, qaflixAccount);
  });

  await step('Open Forgot password and continue with that email', async () => {
    await page.goto('/qaflix/forgot/');
    await page.getByLabel('Email').fill(qaflixAccount.email);
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await step('Set a new password twice', async () => {
    await expect(page.getByRole('heading', { name: 'Set password' })).toBeVisible();
    await page.getByLabel('New password').fill('secret2');
    await page.getByLabel('Confirm password').fill('secret2');
    await page.getByRole('button', { name: 'Update password' }).click();
  });

  await step('Sign in with the new password', async () => {
    await expect(page.getByRole('status')).toHaveText('Password updated. Sign in with the new password.');
    await page.getByLabel('Password').fill('secret2');
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await step('Check we are on Choose how you watch', async () => {
    await expect(page.getByRole('heading', { name: 'Choose how you watch' })).toBeVisible();
  });
});
