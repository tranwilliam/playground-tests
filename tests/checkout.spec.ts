import { expect, test } from './fixtures';
import { CheckoutPage } from './pages/checkout.page';

test('rejects a bad email then places a practice order', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.open();
  await checkout.choosePlan('Team, $20');
  await checkout.fillTester('Ada', 'not-an-email');
  await expect(checkout.error()).toHaveText('Enter an email like tester@example.com.');

  await checkout.fillTester('Ada', 'ada@example.com');
  await checkout.placeOrder();
  await expect(checkout.receipt()).toHaveText('Receipt PG-1042. Team, $20 for Ada. Nothing was charged.');
});

test('the review step keeps the plan you chose', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.open();
  await checkout.choosePlan('Team, $20');
  await checkout.fillTester('Ada', 'ada@example.com');
  await expect(checkout.summary()).toHaveText('Team, $20. Ada. ada@example.com.');
});
