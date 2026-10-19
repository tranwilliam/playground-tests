import { expect, test } from '@playwright/test';

test('rejects a bad email then places a practice order', async ({ page }) => {
  await page.goto('/playground/checkout/');
  await page.getByRole('radio', { name: 'Team, $20' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Your name').fill('Ada');
  await page.getByLabel('Email').fill('not-an-email');
  await page.getByRole('button', { name: 'Review order' }).click();
  await expect(page.locator('#checkout-error')).toHaveText('Enter an email like tester@example.com.');

  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByRole('button', { name: 'Review order' }).click();
  await page.getByRole('button', { name: 'Place practice order' }).click();
  await expect(page.locator('#receipt')).toHaveText('Receipt PG-1042. Team, $20 for Ada. Nothing was charged.');
});
