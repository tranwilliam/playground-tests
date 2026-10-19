import { expect, step, test } from '../shared/fixtures';

// Lab on theQAIguy: https://www.theqaiguy.com/playground/checkout/
// Checkout lab: pick a plan, enter a name and email, review, place a fake order.
// A bad email should error. A good order should print a receipt and not charge anyone.
// The review summary should still show the plan you picked.

test('rejects a bad email then places a practice order', async ({ page }) => {
  await step('Open the checkout lab and choose Team, $20', async () => {
    await page.goto('/playground/checkout/');
    await page.getByRole('radio', { name: 'Team, $20' }).check();
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await step('Enter name Ada and email not-an-email, then click Review order', async () => {
    await page.getByLabel('Your name').fill('Ada');
    await page.getByLabel('Email').fill('not-an-email');
    await page.getByRole('button', { name: 'Review order' }).click();
  });

  await step('Check the page asks for an email like tester@example.com', async () => {
    await expect(page.locator('#checkout-error')).toHaveText('Enter an email like tester@example.com.');
  });

  await step('Enter a real-looking email, review, and place the practice order', async () => {
    await page.getByLabel('Your name').fill('Ada');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByRole('button', { name: 'Review order' }).click();
    await page.getByRole('button', { name: 'Place practice order' }).click();
  });

  await step('Check the receipt is for Team, $20 for Ada and nothing was charged', async () => {
    await expect(page.locator('#receipt')).toHaveText('Receipt PG-1042. Team, $20 for Ada. Nothing was charged.');
  });
});

test('the review step keeps the plan you chose', async ({ page }) => {
  await step('Open checkout, choose Team, $20, and review as Ada / ada@example.com', async () => {
    await page.goto('/playground/checkout/');
    await page.getByRole('radio', { name: 'Team, $20' }).check();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Your name').fill('Ada');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByRole('button', { name: 'Review order' }).click();
  });

  await step('Check the summary still says Team, $20, not a different plan', async () => {
    await expect(page.locator('#checkout-summary')).toHaveText('Team, $20. Ada. ada@example.com.');
  });
});
