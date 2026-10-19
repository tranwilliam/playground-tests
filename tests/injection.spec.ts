import { expect, test } from './fixtures';
import { InjectionPage } from './pages/injection.page';

test('echoes a probe without opening a dialog', async ({ page }) => {
  const dialogs: string[] = [];
  page.on('dialog', (dialog) => {
    dialogs.push(dialog.message());
    return dialog.dismiss();
  });

  const injection = new InjectionPage(page);
  await injection.open();
  await injection.run('qa-probe');
  await expect(injection.echo()).toHaveText('qa-probe');
  expect(dialogs).toEqual([]);
});
