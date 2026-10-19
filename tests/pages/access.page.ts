import type { Page } from '@playwright/test';

export class AccessPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/playground/access/');
  }

  async signIn(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  role() {
    return this.page.locator('#access-role');
  }

  staffButton() {
    return this.page.locator('#open-staff');
  }

  async openNote(id: string) {
    await this.page.getByLabel('Note id').fill(id);
    await this.page.getByRole('button', { name: 'Open note' }).click();
  }

  async requestStaffReport() {
    await this.page.getByRole('button', { name: 'Request staff report' }).click();
  }

  note() {
    return this.page.locator('#note-result');
  }

  staff() {
    return this.page.locator('#staff-result');
  }
}
