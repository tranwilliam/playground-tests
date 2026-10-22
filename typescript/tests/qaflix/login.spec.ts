import { expect, step, test } from '../shared/fixtures';
import { signUp } from './helpers';

// Sign in: https://www.theqaiguy.com/qaflix/login/
// Needs an account first, so we reuse signUp() from helpers.ts.

test('the right password opens the plans page', async ({ page, qaflixAccount }) => {
  await step('Create an account', async () => {
    await signUp(page, qaflixAccount);
  });

  await step('Sign in with that email and password', async () => {
    await page.getByLabel('Email').fill(qaflixAccount.email);
    await page.getByLabel('Password').fill(qaflixAccount.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await step('Check we are on Choose how you watch', async () => {
    await expect(page.getByRole('heading', { name: 'Choose how you watch' })).toBeVisible();
  });
});

test('the wrong password is refused', async ({ page, qaflixAccount }) => {
  await step('Create an account', async () => {
    await signUp(page, qaflixAccount);
  });

  await step('Sign in with the wrong password', async () => {
    await page.getByLabel('Email').fill(qaflixAccount.email);
    await page.getByLabel('Password').fill('nope-nope');
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await step('Check the form says no account matches', async () => {
    await expect(page.locator('.form-error')).toHaveText('No account matches that email and password.');
  });
});
