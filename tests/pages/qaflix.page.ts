import type { Page } from '@playwright/test';
import type { QaflixAccount } from '../fixtures';

export class QaflixPage {
  constructor(private readonly page: Page) {}

  async signUp(account: QaflixAccount) {
    await this.page.goto('/qaflix/signup/');
    await this.page.getByLabel('Name').fill(account.name);
    await this.page.getByLabel('Email').fill(account.email);
    await this.page.getByLabel('Password').fill(account.password);
    await this.page.getByRole('button', { name: 'Create account' }).click();
  }

  async signIn(account: QaflixAccount) {
    await this.page.getByLabel('Password').fill(account.password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async chooseScreen() {
    await this.page.getByRole('radio', { name: /Screen/ }).check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async pay(card: { name: string; number: string; expiry: string; cvc: string }) {
    const frame = this.page.locator('iframe[title="Card details"]').contentFrame();
    await frame.locator('form[data-ready="1"]').waitFor();
    await frame.getByLabel('Name on card').fill(card.name);
    await frame.getByLabel('Card number').fill(card.number.replace(/\s+/g, ''));
    await frame.getByLabel('Expiry').fill(card.expiry);
    await frame.getByLabel('Security code').fill(card.cvc);
    await frame.getByRole('button', { name: 'Start membership' }).click();
  }

  watching() {
    return this.page.getByRole('heading', { name: /Who.s watching/ });
  }
}
