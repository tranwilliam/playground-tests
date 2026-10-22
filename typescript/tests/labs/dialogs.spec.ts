import { expect, step, test } from '../shared/fixtures';

// Lab on theQAIguy: https://www.theqaiguy.com/playground/dialogs/
// Dialogs lab: a notice (dialog) and a delete confirm (alertdialog).
// Closing the notice should put keyboard focus back on Open notice.
// A click on the dimmed page behind delete should keep the report, not delete it.

test('opens a notice and returns focus when it closes', async ({ page }) => {
  await step('Open the dialogs lab', async () => {
    await page.goto('/playground/dialogs/');
  });

  const openNotice = page.getByRole('button', { name: 'Open notice' });

  await step('Click Open notice', async () => {
    await openNotice.click();
  });

  await step('Check the Practice notice dialog is on screen', async () => {
    await expect(page.getByRole('dialog', { name: 'Practice notice' })).toBeVisible();
  });

  await step('Click Close notice', async () => {
    await page.getByRole('button', { name: 'Close notice' }).click();
  });

  await step('Check the dialog is gone, Open notice has focus, and the status says Notice closed.', async () => {
    await expect(page.getByRole('dialog', { name: 'Practice notice' })).toBeHidden();
    await expect(openNotice).toBeFocused();
    await expect(page.locator('#dialog-result')).toHaveText('Notice closed.');
  });
});

test('a click outside the delete dialog keeps the report', async ({ page }) => {
  await step('Open the dialogs lab', async () => {
    await page.goto('/playground/dialogs/');
  });

  await step('Click Delete report so the confirm dialog opens', async () => {
    await page.getByRole('button', { name: 'Delete report' }).click();
    await expect(page.getByRole('alertdialog')).toBeVisible();
  });

  await step('Click the top-left corner of the page (the dimmed backdrop), not Keep report', async () => {
    await page.mouse.click(8, 8);
  });

  await step('Check the status says Report kept. and the confirm dialog is gone', async () => {
    await expect(page.locator('#dialog-result')).toHaveText('Report kept.');
    await expect(page.getByRole('alertdialog')).toBeHidden();
  });
});
