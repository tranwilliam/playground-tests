import { expect, practiceCard, step, test } from './fixtures';
import { QaflixPage } from './pages/qaflix.page';

// Site: theQAIguy (https://www.theqaiguy.com). QAflix is the fake streaming app on /qaflix/.
// This test makes a throwaway account, picks Screen, pays in the card iframe, and lands on Who's watching.
// The account lives in this browser only.

test('signs up, pays in the card iframe, and reaches Who\'s watching', async ({ page, qaflixAccount }) => {
  const qaflix = new QaflixPage(page);

  await step(`Open QAflix sign-up and create ${qaflixAccount.email}`, async () => {
    await qaflix.signUp(qaflixAccount);
  });

  await step('Check the page says the account was created', async () => {
    await expect(page.getByRole('status')).toHaveText('Account created. Sign in with the password you just chose.');
  });

  await step('Sign in with the password we just chose', async () => {
    await qaflix.signIn(qaflixAccount);
  });

  await step('Check we are on Choose how you watch, then pick Screen and continue', async () => {
    await expect(page.getByRole('heading', { name: 'Choose how you watch' })).toBeVisible();
    await qaflix.chooseScreen();
  });

  await step('Check we are on Set up your membership', async () => {
    await expect(page.getByRole('heading', { name: 'Set up your membership' })).toBeVisible();
  });

  await step(`Fill the card iframe with ${practiceCard.accepted} and click Start membership`, async () => {
    await qaflix.pay({
      name: qaflixAccount.name,
      number: practiceCard.accepted,
      expiry: practiceCard.expiry,
      cvc: practiceCard.cvc,
    });
  });

  await step('Check Who\'s watching is on screen (the card iframe is gone)', async () => {
    await expect(qaflix.watching()).toBeVisible({ timeout: 15000 });
  });
});
