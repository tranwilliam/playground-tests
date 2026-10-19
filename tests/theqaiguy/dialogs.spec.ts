import { expect, step, test } from './fixtures';
import { DialogsPage } from './pages/dialogs.page';

// Site: theQAIguy (https://www.theqaiguy.com). Dialogs lab: a notice (dialog) and a delete confirm (alertdialog).
// Closing the notice should put keyboard focus back on Open notice.
// A click on the dimmed page behind delete should keep the report, not delete it.

test('opens a notice and returns focus when it closes', async ({ page }) => {
  const dialogs = new DialogsPage(page);

  await step('Open the dialogs lab', async () => {
    await dialogs.open();
  });

  await step('Click Open notice', async () => {
    await dialogs.noticeButton().click();
  });

  await step('Check the Practice notice dialog is on screen', async () => {
    await expect(dialogs.notice()).toBeVisible();
  });

  await step('Click Close notice', async () => {
    await page.getByRole('button', { name: 'Close notice' }).click();
  });

  await step('Check the dialog is gone, Open notice has focus, and the status says Notice closed.', async () => {
    await expect(dialogs.notice()).toBeHidden();
    await expect(dialogs.noticeButton()).toBeFocused();
    await expect(dialogs.result()).toHaveText('Notice closed.');
  });
});

test('a click outside the delete dialog keeps the report', async ({ page }) => {
  const dialogs = new DialogsPage(page);

  await step('Open the dialogs lab', async () => {
    await dialogs.open();
  });

  await step('Click Delete report so the confirm dialog opens', async () => {
    await dialogs.deleteButton().click();
    await expect(dialogs.confirm()).toBeVisible();
  });

  await step('Click the top-left corner of the page (the dimmed backdrop), not Keep report', async () => {
    await page.mouse.click(8, 8);
  });

  await step('Check the status says Report kept. and the confirm dialog is gone', async () => {
    await expect(dialogs.result()).toHaveText('Report kept.');
    await expect(dialogs.confirm()).toBeHidden();
  });
});
