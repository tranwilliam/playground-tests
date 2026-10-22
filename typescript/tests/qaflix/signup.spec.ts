import { expect, step, test } from '../shared/fixtures';

// Create account: https://www.theqaiguy.com/qaflix/signup/

test('an empty name is refused', async ({ page }) => {
  await step('Open sign-up, leave name blank, and click Create account', async () => {
    await page.goto('/qaflix/signup/');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByLabel('Password').fill('secret1');
    await page.getByRole('button', { name: 'Create account' }).click();
  });

  await step('Check the form says Enter your name.', async () => {
    await expect(page.locator('.form-error')).toHaveText('Enter your name.');
  });
});

test('a short password is refused', async ({ page }) => {
  await step('Open sign-up and use a 3-character password', async () => {
    await page.goto('/qaflix/signup/');
    await page.getByLabel('Name').fill('Ada Tester');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByLabel('Password').fill('abc');
    await page.getByRole('button', { name: 'Create account' }).click();
  });

  await step('Check the form asks for at least 6 characters', async () => {
    await expect(page.locator('.form-error')).toHaveText('Use at least 6 characters.');
  });
});

test('a new account can be created', async ({ page, qaflixAccount }) => {
  await step(`Create ${qaflixAccount.email}`, async () => {
    await page.goto('/qaflix/signup/');
    await page.getByLabel('Name').fill(qaflixAccount.name);
    await page.getByLabel('Email').fill(qaflixAccount.email);
    await page.getByLabel('Password').fill(qaflixAccount.password);
    await page.getByRole('button', { name: 'Create account' }).click();
  });

  await step('Check we land on sign-in with Account created', async () => {
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('status')).toHaveText('Account created. Sign in with the password you just chose.');
  });
});
