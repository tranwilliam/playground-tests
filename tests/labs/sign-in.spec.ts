import { expect, practiceUser, step, test } from '../shared/fixtures';

// Lab on theQAIguy: https://www.theqaiguy.com/playground/sign-in/
// Sign-in lab: a fake login form. tester / practice-only should work.
// locked / locked should stay locked. An empty username should name that field.

test('signs in the practice account and names an empty username', async ({ page }) => {
  await step('Open the sign-in lab', async () => {
    await page.goto('/playground/sign-in/');
  });

  await step(`Type username "${practiceUser.username}" and password "${practiceUser.password}", then click Sign in`, async () => {
    await page.getByLabel('Username').fill(practiceUser.username);
    await page.getByLabel('Password').fill(practiceUser.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await step('Check the page says we signed in as tester and the session stays in the browser', async () => {
    await expect(page.locator('#sign-in-result')).toHaveText('Signed in as tester. This session stays in the browser.');
  });

  await step('Clear both fields and click Sign in again', async () => {
    await page.getByLabel('Username').fill('');
    await page.getByLabel('Password').fill('');
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await step('Check the username field shows "Enter a username."', async () => {
    await expect(page.locator('#username-error')).toHaveText('Enter a username.');
  });
});

test('keeps the locked practice account locked', async ({ page }) => {
  await step('Open the sign-in lab', async () => {
    await page.goto('/playground/sign-in/');
  });

  await step(`Type username "${practiceUser.lockedUsername}" and password "${practiceUser.lockedPassword}", then click Sign in`, async () => {
    await page.getByLabel('Username').fill(practiceUser.lockedUsername);
    await page.getByLabel('Password').fill(practiceUser.lockedPassword);
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await step('Check the page still says this practice account is locked', async () => {
    await expect(page.locator('#sign-in-result')).toHaveText('This practice account is locked.');
  });
});
