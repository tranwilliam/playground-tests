import type { Page } from '@playwright/test';

export class InjectionPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/playground/injection/');
  }

  async run(probe: string) {
    await this.page.getByRole('textbox', { name: 'Probe' }).fill(probe);
    await this.page.getByRole('button', { name: 'Run probe' }).click();
  }

  echo() {
    return this.page.locator('#probe-echo');
  }
}
