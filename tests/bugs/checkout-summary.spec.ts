import { expect, test } from '@playwright/test';

test('the review step keeps the plan you chose', async ({ page }) => {
  await page.goto('/playground/checkout/');
  await page.getByRole('radio', { name: 'Team, $20' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Your name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByRole('button', { name: 'Review order' }).click();
  await expect(page.locator('#checkout-summary')).toHaveText('Team, $20. Ada. ada@example.com.');
});
