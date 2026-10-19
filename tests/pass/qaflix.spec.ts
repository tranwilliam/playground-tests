import { expect, test } from '@playwright/test';

test('signs up, pays in the card iframe, and reaches Who\'s watching', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const stamp = Date.now();
  const email = `tester.${stamp}@example.com`;

  await page.goto('/qaflix/signup/');
  await page.getByLabel('Name').fill('Ada Tester');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill('secret1');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('status')).toHaveText('Account created. Sign in with the password you just chose.');

  await page.getByLabel('Password').fill('secret1');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Choose how you watch' })).toBeVisible();

  await page.getByRole('radio', { name: /Screen/ }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { name: 'Set up your membership' })).toBeVisible();

  const card = page.locator('iframe[title="Card details"]').contentFrame();
  await expect(card.locator('form[data-ready="1"]')).toBeVisible();
  await card.getByLabel('Name on card').fill('Ada Tester');
  await card.getByLabel('Card number').fill('4242424242424242');
  await card.getByLabel('Expiry').fill('12/30');
  await card.getByLabel('Security code').fill('123');
  await expect(card.getByLabel('Name on card')).toHaveValue('Ada Tester');
  await card.getByRole('button', { name: 'Start membership' }).click();
  await expect(page.getByRole('heading', { name: /Who.s watching/ })).toBeVisible({ timeout: 15000 });
});
