import { expect, step, test } from '../shared/fixtures';
import { LocatorsPage } from './pages/locators.page';

// Lab on theQAIguy: https://www.theqaiguy.com/playground/locators/
// Locators lab: find buttons the way a person would (the words on the control).
// "Ship the redesign" changes the Save report button id. The test still clicks by name.
// Add 1 should add 1. Turning alerts on should set aria-pressed to true (screen readers use that).

test('saves the report by name after the redesign', async ({ page }) => {
  const locators = new LocatorsPage(page);

  await step('Open the locators lab and click Save report by its visible name', async () => {
    await locators.open();
    await locators.saveReport();
  });

  await step('Check the status says Report saved.', async () => {
    await expect(locators.reportStatus()).toHaveText('Report saved.');
  });

  await step('Tick Ship the redesign (the button id changes) and save again by name', async () => {
    await locators.shipRedesign();
    await expect(page.locator('#save-report')).toHaveCount(0);
    await locators.saveReport();
  });

  await step('Check it still says Report saved. after the id changed', async () => {
    await expect(locators.reportStatus()).toHaveText('Report saved.');
  });
});

test('Add 1 adds 1', async ({ page }) => {
  const locators = new LocatorsPage(page);

  await step('Open the locators lab', async () => {
    await locators.open();
  });

  await step('Click Add 1', async () => {
    await locators.addOne();
  });

  await step('Check the counter shows 1', async () => {
    await expect(locators.counter()).toHaveText('1');
  });
});

test('turning alerts on sets aria-pressed to true', async ({ page }) => {
  const locators = new LocatorsPage(page);

  await step('Open the locators lab. Alerts should start off', async () => {
    await locators.open();
    await expect(locators.alerts()).toHaveText('Alerts off');
  });

  await step('Click the alerts toggle', async () => {
    await locators.alerts().click();
  });

  await step('Check the label says Alerts on and aria-pressed is true', async () => {
    await expect(locators.alerts()).toHaveText('Alerts on');
    await expect(locators.alerts()).toHaveAttribute('aria-pressed', 'true');
  });
});
