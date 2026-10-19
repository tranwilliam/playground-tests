import { expect, test } from './fixtures';
import { DialogsPage } from './pages/dialogs.page';

test('opens a notice and returns focus when it closes', async ({ page }) => {
  const dialogs = new DialogsPage(page);
  await dialogs.open();
  await dialogs.noticeButton().click();
  await expect(dialogs.notice()).toBeVisible();
  await page.getByRole('button', { name: 'Close notice' }).click();
  await expect(dialogs.notice()).toBeHidden();
  await expect(dialogs.noticeButton()).toBeFocused();
  await expect(dialogs.result()).toHaveText('Notice closed.');
});

test('a click outside the delete dialog keeps the report', async ({ page }) => {
  const dialogs = new DialogsPage(page);
  await dialogs.open();
  await dialogs.deleteButton().click();
  await expect(dialogs.confirm()).toBeVisible();
  await page.mouse.click(8, 8);
  await expect(dialogs.result()).toHaveText('Report kept.');
  await expect(dialogs.confirm()).toBeHidden();
});
