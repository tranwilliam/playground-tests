import type { Page } from '@playwright/test';
import { expect, practiceCard, type QaflixAccount } from '../shared/fixtures';

// Shared QAflix steps. Several specs need "make an account" or "pay" before their own check.
// These are plain functions, not page objects. Specs still use page.goto / getByLabel themselves
// when the step is unique to that test.

export async function signUp(page: Page, account: QaflixAccount) {
  await page.goto('/qaflix/signup/');
  await page.getByLabel('Name').fill(account.name);
  await page.getByLabel('Email').fill(account.email);
  await page.getByLabel('Password').fill(account.password);
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('status')).toHaveText('Account created. Sign in with the password you just chose.');
}

export async function signIn(page: Page, account: QaflixAccount) {
  if (!page.url().includes('/login')) await page.goto('/qaflix/login/');
  await page.getByLabel('Email').fill(account.email);
  await page.getByLabel('Password').fill(account.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}

export async function chooseScreen(page: Page) {
  await expect(page.getByRole('heading', { name: 'Choose how you watch' })).toBeVisible();
  await page.getByRole('radio', { name: /Screen/ }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
}

export async function payWithPracticeCard(page: Page, nameOnCard: string) {
  await expect(page.getByRole('heading', { name: 'Set up your membership' })).toBeVisible();
  // Card fields live inside an iframe (a page inside the page).
  const card = page.locator('iframe[title="Card details"]').contentFrame();
  await card.locator('form[data-ready="1"]').waitFor();
  await card.getByLabel('Name on card').fill(nameOnCard);
  await card.getByLabel('Card number').fill(practiceCard.accepted.replace(/\s+/g, ''));
  await card.getByLabel('Expiry').fill(practiceCard.expiry);
  await card.getByLabel('Security code').fill(practiceCard.cvc);
  await card.getByRole('button', { name: 'Start membership' }).click();
  await expect(page.getByRole('heading', { name: /Who.s watching/ })).toBeVisible({ timeout: 15000 });
}

export async function startMembership(page: Page, account: QaflixAccount) {
  await signUp(page, account);
  await signIn(page, account);
  await chooseScreen(page);
  await payWithPracticeCard(page, account.name);
}

export async function pickProfile(page: Page, name: string) {
  await page.getByRole('button', { name }).click();
  await expect(page.getByRole('heading', { name: 'QA: Guardians of the Algorithm' })).toBeVisible();
}
