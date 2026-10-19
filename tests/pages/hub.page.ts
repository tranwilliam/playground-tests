import type { Page } from '@playwright/test';

export class HubPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/playground/');
  }

  heading() {
    return this.page.getByRole('heading', { name: 'Playground' });
  }

  qaflix() {
    return this.page.getByRole('link', { name: /Open QAflix/i });
  }

  lab(title: string) {
    return this.page.getByRole('heading', { name: title });
  }
}
