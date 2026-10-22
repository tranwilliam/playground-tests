import { expect, step, test } from '../shared/fixtures';
import { chooseScreen, payWithPracticeCard, signIn, signUp } from './helpers';

// Plan + fake card: /qaflix/plans/ then /qaflix/payment/
// Sign-up and sign-in are the same steps as login.spec, so they live in helpers.ts.

test('Screen plan plus the practice card lands on Who\'s watching', async ({ page, qaflixAccount }) => {
  await step('Create an account and sign in', async () => {
    await signUp(page, qaflixAccount);
    await signIn(page, qaflixAccount);
  });

  await step('Choose the Screen plan', async () => {
    await chooseScreen(page);
  });

  await step('Pay with 4242 in the card iframe', async () => {
    await payWithPracticeCard(page, qaflixAccount.name);
  });

  await step('Check Who\'s watching is on screen', async () => {
    await expect(page.getByRole('heading', { name: /Who.s watching/ })).toBeVisible();
  });
});
