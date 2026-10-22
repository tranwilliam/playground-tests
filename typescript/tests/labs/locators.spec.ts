import { expect, step, test } from '../shared/fixtures';

// Lab on theQAIguy: https://www.theqaiguy.com/playground/locators/
// Locators lab: find buttons the way a person would (the words on the control).
// "Ship the redesign" changes the Save report button id. The test still clicks by name.
// Add 1 should add 1. Turning alerts on should set aria-pressed to true (screen readers use that).

test('saves the report by name after the redesign', async ({ page }) => {
  await step('Open the locators lab and click Save report by its visible name', async () => {
    await page.goto('/playground/locators/');
    // getByRole looks at the words on the button, not the id. That still works after the redesign.
    await page.getByRole('button', { name: 'Save report', exact: true }).click();
  });

  await step('Check the status says Report saved.', async () => {
    await expect(page.locator('#report-status')).toHaveText('Report saved.');
  });

  await step('Tick Ship the redesign (the button id changes) and save again by name', async () => {
    await page.getByLabel('Ship the redesign').check();
    await expect(page.locator('#save-report')).toHaveCount(0);
    await page.getByRole('button', { name: 'Save report', exact: true }).click();
  });

  await step('Check it still says Report saved. after the id changed', async () => {
    await expect(page.locator('#report-status')).toHaveText('Report saved.');
  });
});

test('Add 1 adds 1', async ({ page }) => {
  await step('Open the locators lab', async () => {
    await page.goto('/playground/locators/');
  });

  await step('Click Add 1', async () => {
    await page.getByRole('button', { name: 'Add 1' }).click();
  });

  await step('Check the counter shows 1', async () => {
    await expect(page.locator('#counter-value')).toHaveText('1');
  });
});

test('turning alerts on sets aria-pressed to true', async ({ page }) => {
  const alerts = page.locator('#toggle-alerts');

  await step('Open the locators lab. Alerts should start off', async () => {
    await page.goto('/playground/locators/');
    await expect(alerts).toHaveText('Alerts off');
  });

  await step('Click the alerts toggle', async () => {
    await alerts.click();
  });

  await step('Check the label says Alerts on and aria-pressed is true', async () => {
    await expect(alerts).toHaveText('Alerts on');
    await expect(alerts).toHaveAttribute('aria-pressed', 'true');
  });
});
