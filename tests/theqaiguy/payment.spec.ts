import { expect, practiceCard, step, test } from './fixtures';
import { PaymentPage } from './pages/payment.page';

// Site: theQAIguy (https://www.theqaiguy.com). Card payment lab: a fake card form. 4242 is the accepted practice card.
// 0002 is the declined practice card. The page should never call Stripe.

test('accepts the practice card and does not call Stripe', async ({ page }) => {
  // Watch every network request. If any URL contains "stripe", we store it.
  const leaked: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('stripe')) leaked.push(request.url());
  });

  const payment = new PaymentPage(page);

  await step('Open the card payment lab', async () => {
    await payment.open();
  });

  await step(`Pay with the accepted practice card ${practiceCard.accepted}`, async () => {
    await payment.pay({
      name: practiceCard.name,
      number: practiceCard.accepted,
      expiry: practiceCard.expiry,
      cvc: practiceCard.cvc,
    });
  });

  await step('Check the page says the practice payment was accepted and nothing was charged', async () => {
    await expect(payment.result()).toHaveText('Practice payment accepted. Nothing was charged.');
  });

  await step('Check the browser did not call Stripe', async () => {
    expect(leaked).toEqual([]);
  });
});

test('the slip matches a declined card', async ({ page }) => {
  const payment = new PaymentPage(page);

  await step('Open the card payment lab', async () => {
    await payment.open();
  });

  await step(`Pay with the declined practice card ${practiceCard.declined}`, async () => {
    await payment.pay({
      name: practiceCard.name,
      number: practiceCard.declined,
      expiry: practiceCard.expiry,
      cvc: practiceCard.cvc,
    });
  });

  await step('Check the result text says the practice card was declined', async () => {
    await expect(payment.result()).toHaveText('Practice card declined.');
  });

  // The slip is the extra line under the form. It should say the same thing as the result.
  await step('Check the slip says the same declined message', async () => {
    await expect(payment.slip()).toHaveText('Practice card declined.');
  });
});
