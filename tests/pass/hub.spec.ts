import { expect, test } from '@playwright/test';

test('the playground hub lists the labs and QAflix', async ({ page }) => {
  await page.goto('/playground/');
  await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Open QAflix/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Card payment' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Access' })).toBeVisible();
});
