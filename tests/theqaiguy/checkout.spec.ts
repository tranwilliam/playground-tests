import { expect, step, test } from './fixtures';
import { CheckoutPage } from './pages/checkout.page';

// Site: theQAIguy (https://www.theqaiguy.com). Checkout lab: pick a plan, enter a name and email, review, place a fake order.
// A bad email should error. A good order should print a receipt and not charge anyone.
// The review summary should still show the plan you picked.

test('rejects a bad email then places a practice order', async ({ page }) => {
  const checkout = new CheckoutPage(page);

  await step('Open the checkout lab and choose Team, $20', async () => {
    await checkout.open();
    await checkout.choosePlan('Team, $20');
  });

  await step('Enter name Ada and email not-an-email, then click Review order', async () => {
    await checkout.fillTester('Ada', 'not-an-email');
  });

  await step('Check the page asks for an email like tester@example.com', async () => {
    await expect(checkout.error()).toHaveText('Enter an email like tester@example.com.');
  });

  await step('Enter a real-looking email, review, and place the practice order', async () => {
    await checkout.fillTester('Ada', 'ada@example.com');
    await checkout.placeOrder();
  });

  await step('Check the receipt is for Team, $20 for Ada and nothing was charged', async () => {
    await expect(checkout.receipt()).toHaveText('Receipt PG-1042. Team, $20 for Ada. Nothing was charged.');
  });
});

test('the review step keeps the plan you chose', async ({ page }) => {
  const checkout = new CheckoutPage(page);

  await step('Open checkout, choose Team, $20, and review as Ada / ada@example.com', async () => {
    await checkout.open();
    await checkout.choosePlan('Team, $20');
    await checkout.fillTester('Ada', 'ada@example.com');
  });

  await step('Check the summary still says Team, $20, not a different plan', async () => {
    await expect(checkout.summary()).toHaveText('Team, $20. Ada. ada@example.com.');
  });
});
