import { expect, step, test } from './fixtures';
import { HubPage } from './pages/hub.page';

// The hub is the playground home page. It should list QAflix and every practice lab.

test('the hub lists QAflix and the practice labs', async ({ page }) => {
  const hub = new HubPage(page);

  await step('Open https://www.theqaiguy.com/playground/', async () => {
    await hub.open();
  });

  await step('Check the Playground heading and the Open QAflix link are on the page', async () => {
    await expect(hub.heading()).toBeVisible();
    await expect(hub.qaflix()).toBeVisible();
  });

  await step('Check each lab card is listed: Sign in, Card payment, Dialogs, Checkout, Locators, Injection, Access', async () => {
    await expect(hub.lab('Sign in')).toBeVisible();
    await expect(hub.lab('Card payment')).toBeVisible();
    await expect(hub.lab('Dialogs')).toBeVisible();
    await expect(hub.lab('Checkout')).toBeVisible();
    await expect(hub.lab('Locators')).toBeVisible();
    await expect(hub.lab('Injection')).toBeVisible();
    await expect(hub.lab('Access')).toBeVisible();
  });
});
