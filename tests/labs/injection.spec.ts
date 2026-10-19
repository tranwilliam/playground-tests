import { expect, step, test } from '../shared/fixtures';

// Lab on theQAIguy: https://www.theqaiguy.com/playground/injection/
// Injection lab: you type a probe string and the page echoes it.
// A safe echo shows the text. It should not pop a browser alert.

test('echoes a probe without opening a dialog', async ({ page }) => {
  // If the page tries to open a browser alert, store the message and dismiss it.
  const dialogs: string[] = [];
  page.on('dialog', (dialog) => {
    dialogs.push(dialog.message());
    return dialog.dismiss();
  });

  await step('Open the injection lab', async () => {
    await page.goto('/playground/injection/');
  });

  await step('Type qa-probe and click Run probe', async () => {
    await page.getByRole('textbox', { name: 'Probe' }).fill('qa-probe');
    await page.getByRole('button', { name: 'Run probe' }).click();
  });

  await step('Check the echo shows qa-probe and no browser alert opened', async () => {
    await expect(page.locator('#probe-echo')).toHaveText('qa-probe');
    expect(dialogs).toEqual([]);
  });
});
