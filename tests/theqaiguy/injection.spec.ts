import { expect, step, test } from './fixtures';
import { InjectionPage } from './pages/injection.page';

// Site: theQAIguy (https://www.theqaiguy.com). Injection lab: you type a probe string and the page echoes it.
// A safe echo shows the text. It should not pop a browser alert.

test('echoes a probe without opening a dialog', async ({ page }) => {
  // If the page tries to open a browser alert, store the message and dismiss it.
  const dialogs: string[] = [];
  page.on('dialog', (dialog) => {
    dialogs.push(dialog.message());
    return dialog.dismiss();
  });

  const injection = new InjectionPage(page);

  await step('Open the injection lab', async () => {
    await injection.open();
  });

  await step('Type qa-probe and click Run probe', async () => {
    await injection.run('qa-probe');
  });

  await step('Check the echo shows qa-probe and no browser alert opened', async () => {
    await expect(injection.echo()).toHaveText('qa-probe');
    expect(dialogs).toEqual([]);
  });
});
