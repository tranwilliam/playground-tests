import { expect, step, test } from '../shared/fixtures';
import { pickProfile, startMembership } from './helpers';

// Playback: Home Play, then the player Play button.
// Needs a membership and a chosen profile first.

test('Play opens the featured title and the player can start', async ({ page, qaflixAccount }) => {
  await step('Start a membership and pick the default profile', async () => {
    await startMembership(page, qaflixAccount);
    await pickProfile(page, qaflixAccount.name);
  });

  await step('Click Play on the billboard', async () => {
    await page.getByRole('link', { name: 'Play' }).click();
  });

  await step('Check the player page is the featured title, then press Play', async () => {
    await expect(page.getByRole('heading', { name: 'QA: Guardians of the Algorithm' })).toBeVisible();
    await page.getByRole('button', { name: 'Play' }).click();
    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
  });
});
