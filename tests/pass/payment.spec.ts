import { expect, test } from '@playwright/test';

test('accepts the practice card and does not call Stripe', async ({ page }) => {
  const leaked: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('stripe')) leaked.push(request.url());
  });

  await page.goto('/playground/payment/');
  await page.getByLabel('Name on card').fill('Practice Tester');
  await page.getByLabel('Card number').fill('4242 4242 4242 4242');
  await page.getByLabel('Expiry').fill('12/30');
  await page.getByLabel('Security code').fill('123');
  await page.getByRole('button', { name: 'Pay with practice card' }).click();
  await expect(page.locator('#payment-result')).toHaveText('Practice payment accepted. Nothing was charged.');
  expect(leaked).toEqual([]);
});
