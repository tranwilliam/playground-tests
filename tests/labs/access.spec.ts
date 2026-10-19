import { expect, practiceUser, step, test } from '../shared/fixtures';

// Lab on theQAIguy: https://www.theqaiguy.com/playground/access/
// Access lab: sign in as member, editor, or admin (password is always practice-only).
// A member should not see the staff report button.
// A member should not read someone else's note (try note id u-editor) or the staff report.

test('signs in a member and keeps the staff report hidden', async ({ page }) => {
  await step('Open the access lab', async () => {
    await page.goto('/playground/access/');
  });

  await step(`Sign in as member / ${practiceUser.password}`, async () => {
    await page.getByLabel('Username').fill('member');
    await page.getByLabel('Password').fill(practiceUser.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await step('Check the role line says member and the staff report control is hidden', async () => {
    await expect(page.locator('#access-role')).toHaveText('Signed in as member (u-member).');
    await expect(page.locator('#open-staff')).toBeHidden();
  });
});

test('a member cannot read another person\'s note or the staff report', async ({ page }) => {
  await step('Open the access lab and sign in as member', async () => {
    await page.goto('/playground/access/');
    await page.getByLabel('Username').fill('member');
    await page.getByLabel('Password').fill(practiceUser.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await step('Open note id u-editor (that note belongs to the editor)', async () => {
    await page.getByLabel('Note id').fill('u-editor');
    await page.getByRole('button', { name: 'Open note' }).click();
  });

  await step('Check the page refuses with "This note belongs to someone else."', async () => {
    await expect(page.locator('#note-result')).toHaveText('This note belongs to someone else.');
  });

  await step('Click Request staff report', async () => {
    await page.getByRole('button', { name: 'Request staff report' }).click();
  });

  await step('Check the page says the staff report is for an admin', async () => {
    await expect(page.locator('#staff-result')).toHaveText('The staff report is for an admin.');
  });
});
