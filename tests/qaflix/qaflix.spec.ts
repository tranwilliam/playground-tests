import { expect, practiceCard, step, test } from '../shared/fixtures';

// QAflix on theQAIguy: https://www.theqaiguy.com/qaflix/
// Fake streaming app. This folder is only QAflix. Labs live in tests/labs/. The hub lives in tests/playground/.
// This test makes a throwaway account, picks Screen, pays in the card iframe, and lands on Who's watching.
// The account lives in this browser only.

test('signs up, pays in the card iframe, and reaches Who\'s watching', async ({ page, qaflixAccount }) => {
  await step(`Open QAflix sign-up and create ${qaflixAccount.email}`, async () => {
    await page.goto('/qaflix/signup/');
    await page.getByLabel('Name').fill(qaflixAccount.name);
    await page.getByLabel('Email').fill(qaflixAccount.email);
    await page.getByLabel('Password').fill(qaflixAccount.password);
    await page.getByRole('button', { name: 'Create account' }).click();
  });

  await step('Check the page says the account was created', async () => {
    await expect(page.getByRole('status')).toHaveText('Account created. Sign in with the password you just chose.');
  });

  await step('Sign in with the password we just chose', async () => {
    await page.getByLabel('Password').fill(qaflixAccount.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await step('Check we are on Choose how you watch, then pick Screen and continue', async () => {
    await expect(page.getByRole('heading', { name: 'Choose how you watch' })).toBeVisible();
    await page.getByRole('radio', { name: /Screen/ }).check();
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await step('Check we are on Set up your membership', async () => {
    await expect(page.getByRole('heading', { name: 'Set up your membership' })).toBeVisible();
  });

  await step(`Fill the card iframe with ${practiceCard.accepted} and click Start membership`, async () => {
    // The card fields live inside an iframe (a page inside the page). Talk to that frame, not the outer page.
    const card = page.locator('iframe[title="Card details"]').contentFrame();
    await card.locator('form[data-ready="1"]').waitFor();
    await card.getByLabel('Name on card').fill(qaflixAccount.name);
    await card.getByLabel('Card number').fill(practiceCard.accepted.replace(/\s+/g, ''));
    await card.getByLabel('Expiry').fill(practiceCard.expiry);
    await card.getByLabel('Security code').fill(practiceCard.cvc);
    await card.getByRole('button', { name: 'Start membership' }).click();
  });

  await step('Check Who\'s watching is on screen (the card iframe is gone)', async () => {
    await expect(page.getByRole('heading', { name: /Who.s watching/ })).toBeVisible({ timeout: 15000 });
  });
});
