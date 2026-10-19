import { expect, practiceCard, test } from './fixtures';
import { PaymentPage } from './pages/payment.page';

test('accepts the practice card and does not call Stripe', async ({ page }) => {
  const leaked: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('stripe')) leaked.push(request.url());
  });

  const payment = new PaymentPage(page);
  await payment.open();
  await payment.pay({
    name: practiceCard.name,
    number: practiceCard.accepted,
    expiry: practiceCard.expiry,
    cvc: practiceCard.cvc,
  });
  await expect(payment.result()).toHaveText('Practice payment accepted. Nothing was charged.');
  expect(leaked).toEqual([]);
});

test('the slip matches a declined card', async ({ page }) => {
  const payment = new PaymentPage(page);
  await payment.open();
  await payment.pay({
    name: practiceCard.name,
    number: practiceCard.declined,
    expiry: practiceCard.expiry,
    cvc: practiceCard.cvc,
  });
  await expect(payment.result()).toHaveText('Practice card declined.');
  await expect(payment.slip()).toHaveText('Practice card declined.');
});
