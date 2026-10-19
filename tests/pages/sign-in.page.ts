import type { Page } from '@playwright/test';

export class SignInPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/playground/sign-in/');
  }

  async signIn(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  result() {
    return this.page.locator('#sign-in-result');
  }

  usernameError() {
    return this.page.locator('#username-error');
  }
}
