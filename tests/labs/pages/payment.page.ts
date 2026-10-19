import type { Page } from '@playwright/test';

// Helpers for /playground/payment/. Fill the fake card and click Pay with practice card.
export class PaymentPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/playground/payment/');
  }

  async pay(card: { name: string; number: string; expiry: string; cvc: string }) {
    await this.page.getByLabel('Name on card').fill(card.name);
    await this.page.getByLabel('Card number').fill(card.number);
    await this.page.getByLabel('Expiry').fill(card.expiry);
    await this.page.getByLabel('Security code').fill(card.cvc);
    await this.page.getByRole('button', { name: 'Pay with practice card' }).click();
  }

  result() {
    return this.page.locator('#payment-result');
  }

  slip() {
    return this.page.locator('#slip-result');
  }
}
