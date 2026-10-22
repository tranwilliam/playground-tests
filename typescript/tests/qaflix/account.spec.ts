import { expect, step, test } from '../shared/fixtures';
import { pickProfile, startMembership } from './helpers';

// Account: https://www.theqaiguy.com/qaflix/account/
// Sign out and cancel need a paid profile first.

test('Account shows the Screen plan and Sign out returns home', async ({ page, qaflixAccount }) => {
  await step('Start a membership and pick the default profile', async () => {
    await startMembership(page, qaflixAccount);
    await pickProfile(page, qaflixAccount.name);
  });

  await step('Open Account', async () => {
    await page.getByRole('link', { name: 'Account' }).click();
  });

  await step('Check the membership is Screen and Active', async () => {
    await expect(page.locator('#membership-plan')).toHaveText('Screen');
    await expect(page.locator('#membership-status')).toHaveText('Active');
  });

  await step('Click Sign out', async () => {
    // Header and the membership card both have Sign out. Use the one in Membership.
    await page.getByRole('region', { name: 'Membership' }).getByRole('button', { name: 'Sign out' }).click();
  });

  await step('Check we are back on the marketing home', async () => {
    await expect(page.getByRole('heading', { name: 'Unlimited films, series, and testing.' })).toBeVisible();
  });
});

test('Cancel membership marks the plan Canceled', async ({ page, qaflixAccount }) => {
  await step('Start a membership, pick a profile, and open Account', async () => {
    await startMembership(page, qaflixAccount);
    await pickProfile(page, qaflixAccount.name);
    await page.getByRole('link', { name: 'Account' }).click();
  });

  await step('Open Cancel membership and confirm', async () => {
    await page.getByRole('button', { name: 'Cancel membership' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Cancel membership' }).click();
  });

  await step('Check status is Canceled', async () => {
    await expect(page.locator('#membership-status')).toHaveText('Canceled');
  });
});
