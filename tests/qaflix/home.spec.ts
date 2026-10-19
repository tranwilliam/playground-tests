import { expect, step, test } from '../shared/fixtures';

// QAflix marketing home: https://www.theqaiguy.com/qaflix/
// Get Started should send a valid email to sign-up.

test('the home page offers Get Started', async ({ page }) => {
  await step('Open QAflix', async () => {
    await page.goto('/qaflix/');
  });

  await step('Check the hero heading is on the page', async () => {
    await expect(page.getByRole('heading', { name: 'Unlimited films, series, and testing.' })).toBeVisible();
  });
});

test('Get Started with a bad email asks for a real-looking address', async ({ page }) => {
  await step('Open QAflix and type not-an-email', async () => {
    await page.goto('/qaflix/');
    await page.getByPlaceholder('Email address').fill('not-an-email');
    await page.getByRole('button', { name: 'Get Started' }).click();
  });

  await step('Check the page asks for an email like ada@example.com', async () => {
    await expect(page.locator('.form-error')).toHaveText('Enter an email like ada@example.com.');
  });
});

test('Get Started with a valid email opens sign-up', async ({ page }) => {
  await step('Open QAflix, type ada@example.com, and click Get Started', async () => {
    await page.goto('/qaflix/');
    await page.getByPlaceholder('Email address').fill('ada@example.com');
    await page.getByRole('button', { name: 'Get Started' }).click();
  });

  await step('Check we are on Create your account and the email field is filled', async () => {
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
    await expect(page.getByLabel('Email')).toHaveValue('ada@example.com');
  });
});
