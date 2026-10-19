import { expect, practiceCard, test } from './fixtures';
import { QaflixPage } from './pages/qaflix.page';

test('signs up, pays in the card iframe, and reaches Who\'s watching', async ({ page, qaflixAccount }) => {
  const qaflix = new QaflixPage(page);
  await qaflix.signUp(qaflixAccount);
  await expect(page.getByRole('status')).toHaveText('Account created. Sign in with the password you just chose.');
  await qaflix.signIn(qaflixAccount);
  await expect(page.getByRole('heading', { name: 'Choose how you watch' })).toBeVisible();
  await qaflix.chooseScreen();
  await expect(page.getByRole('heading', { name: 'Set up your membership' })).toBeVisible();
  await qaflix.pay({
    name: qaflixAccount.name,
    number: practiceCard.accepted,
    expiry: practiceCard.expiry,
    cvc: practiceCard.cvc,
  });
  await expect(qaflix.watching()).toBeVisible({ timeout: 15000 });
});
