import { expect, test } from './fixtures';
import { HubPage } from './pages/hub.page';

test('the hub lists QAflix and the practice labs', async ({ page }) => {
  const hub = new HubPage(page);
  await hub.open();
  await expect(hub.heading()).toBeVisible();
  await expect(hub.qaflix()).toBeVisible();
  await expect(hub.lab('Sign in')).toBeVisible();
  await expect(hub.lab('Card payment')).toBeVisible();
  await expect(hub.lab('Dialogs')).toBeVisible();
  await expect(hub.lab('Checkout')).toBeVisible();
  await expect(hub.lab('Locators')).toBeVisible();
  await expect(hub.lab('Injection')).toBeVisible();
  await expect(hub.lab('Access')).toBeVisible();
});
