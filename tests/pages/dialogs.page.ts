import type { Page } from '@playwright/test';

export class DialogsPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/playground/dialogs/');
  }

  noticeButton() {
    return this.page.getByRole('button', { name: 'Open notice' });
  }

  notice() {
    return this.page.getByRole('dialog', { name: 'Practice notice' });
  }

  deleteButton() {
    return this.page.getByRole('button', { name: 'Delete report' });
  }

  confirm() {
    return this.page.getByRole('alertdialog');
  }

  result() {
    return this.page.locator('#dialog-result');
  }
}
