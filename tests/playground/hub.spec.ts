import { expect, step, test } from '../shared/fixtures';

// Playground hub on theQAIguy: https://www.theqaiguy.com/playground/
// This folder is only the home page. The seven labs live in tests/labs/. QAflix lives in tests/qaflix/.

test('the hub lists QAflix and the practice labs', async ({ page }) => {
  await step('Open https://www.theqaiguy.com/playground/', async () => {
    await page.goto('/playground/');
  });

  await step('Check the Playground heading and the Open QAflix link are on the page', async () => {
    await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Open QAflix/i })).toBeVisible();
  });

  await step('Check each lab card is listed: Sign in, Card payment, Dialogs, Checkout, Locators, Injection, Access', async () => {
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Card payment' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dialogs' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Locators' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Injection' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Access' })).toBeVisible();
  });
});
