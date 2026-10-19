import { expect, step, test } from '../shared/fixtures';
import { pickProfile, startMembership } from './helpers';

// Who's watching: https://www.theqaiguy.com/qaflix/profiles/
// startMembership() is the shared setup (account + Screen + card). This file only checks profiles.

test('picking the default profile opens Home', async ({ page, qaflixAccount }) => {
  await step('Start a membership (account, Screen plan, practice card)', async () => {
    await startMembership(page, qaflixAccount);
  });

  await step(`Click the ${qaflixAccount.name} profile`, async () => {
    await pickProfile(page, qaflixAccount.name);
  });
});

test('a second profile can be added', async ({ page, qaflixAccount }) => {
  await step('Start a membership', async () => {
    await startMembership(page, qaflixAccount);
  });

  await step('Open Add Profile, name it Kids, and continue', async () => {
    await page.getByRole('link', { name: 'Add Profile' }).click();
    await page.getByLabel('Name').fill('Kids');
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await step('Check both profile tiles are on Who\'s watching', async () => {
    await expect(page.getByRole('heading', { name: /Who.s watching/ })).toBeVisible();
    await expect(page.getByRole('button', { name: qaflixAccount.name })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Kids' })).toBeVisible();
  });
});
