import type { Page } from '@playwright/test';
import { findControl } from '../support/find-control';

// Helpers for /playground/locators/. Save report is found by its visible name, not by id.
export class LocatorsPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/playground/locators/');
  }

  async saveReport() {
    const save = await findControl(this.page, { role: 'button', name: 'Save report', testId: 'save-report' });
    await save.click();
  }

  async shipRedesign() {
    await this.page.getByLabel('Ship the redesign').check();
  }

  async addOne() {
    await this.page.getByRole('button', { name: 'Add 1' }).click();
  }

  reportStatus() {
    return this.page.locator('#report-status');
  }

  counter() {
    return this.page.locator('#counter-value');
  }

  alerts() {
    return this.page.locator('#toggle-alerts');
  }
}
