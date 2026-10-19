import { expect, test } from '@playwright/test';

test('echoes a probe without opening a dialog', async ({ page }) => {
  const dialogs: string[] = [];
  page.on('dialog', (dialog) => {
    dialogs.push(dialog.message());
    return dialog.dismiss();
  });

  await page.goto('/playground/injection/');
  await page.getByRole('textbox', { name: 'Probe' }).fill('qa-probe');
  await page.getByRole('button', { name: 'Run probe' }).click();
  await expect(page.locator('#probe-echo')).toHaveText('qa-probe');
  expect(dialogs).toEqual([]);
});
