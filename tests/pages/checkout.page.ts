import type { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/playground/checkout/');
  }

  plan(name: string): Locator {
    return this.page.getByRole('radio', { name });
  }

  async choosePlan(name: string) {
    await this.plan(name).check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async fillTester(name: string, email: string) {
    await this.page.getByLabel('Your name').fill(name);
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByRole('button', { name: 'Review order' }).click();
  }

  async placeOrder() {
    await this.page.getByRole('button', { name: 'Place practice order' }).click();
  }

  error() {
    return this.page.locator('#checkout-error');
  }

  summary() {
    return this.page.locator('#checkout-summary');
  }

  receipt() {
    return this.page.locator('#receipt');
  }
}
