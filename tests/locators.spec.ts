import { expect, test } from './fixtures';
import { LocatorsPage } from './pages/locators.page';

test('saves the report by name after the redesign', async ({ page }) => {
  const locators = new LocatorsPage(page);
  await locators.open();
  await locators.saveReport();
  await expect(locators.reportStatus()).toHaveText('Report saved.');

  await locators.shipRedesign();
  await expect(page.locator('#save-report')).toHaveCount(0);
  await locators.saveReport();
  await expect(locators.reportStatus()).toHaveText('Report saved.');
});

test('Add 1 adds 1', async ({ page }) => {
  const locators = new LocatorsPage(page);
  await locators.open();
  await locators.addOne();
  await expect(locators.counter()).toHaveText('1');
});

test('turning alerts on sets aria-pressed to true', async ({ page }) => {
  const locators = new LocatorsPage(page);
  await locators.open();
  await expect(locators.alerts()).toHaveText('Alerts off');
  await locators.alerts().click();
  await expect(locators.alerts()).toHaveText('Alerts on');
  await expect(locators.alerts()).toHaveAttribute('aria-pressed', 'true');
});
