import { expect, test } from '@playwright/test';

test('the payment slip matches a declined card', async ({ page }) => {
  await page.goto('/playground/payment/');
  await page.getByLabel('Name on card').fill('Practice Tester');
  await page.getByLabel('Card number').fill('4000 0000 0000 0002');
  await page.getByLabel('Expiry').fill('12/30');
  await page.getByLabel('Security code').fill('123');
  await page.getByRole('button', { name: 'Pay with practice card' }).click();
  await expect(page.locator('#payment-result')).toHaveText('Practice card declined.');
  await expect(page.locator('#slip-result')).toHaveText('Practice card declined.');
});
