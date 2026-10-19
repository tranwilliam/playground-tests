import { expect, practiceUser, step, test } from './fixtures';
import { AccessPage } from './pages/access.page';

// Site: theQAIguy (https://www.theqaiguy.com). Access lab: sign in as member, editor, or admin (password is always practice-only).
// A member should not see the staff report button.
// A member should not read someone else's note (try note id u-editor) or the staff report.

test('signs in a member and keeps the staff report hidden', async ({ page }) => {
  const access = new AccessPage(page);

  await step('Open the access lab', async () => {
    await access.open();
  });

  await step(`Sign in as member / ${practiceUser.password}`, async () => {
    await access.signIn('member', practiceUser.password);
  });

  await step('Check the role line says member and the staff report control is hidden', async () => {
    await expect(access.role()).toHaveText('Signed in as member (u-member).');
    await expect(access.staffButton()).toBeHidden();
  });
});

test('a member cannot read another person\'s note or the staff report', async ({ page }) => {
  const access = new AccessPage(page);

  await step('Open the access lab and sign in as member', async () => {
    await access.open();
    await access.signIn('member', practiceUser.password);
  });

  await step('Open note id u-editor (that note belongs to the editor)', async () => {
    await access.openNote('u-editor');
  });

  await step('Check the page refuses with "This note belongs to someone else."', async () => {
    await expect(access.note()).toHaveText('This note belongs to someone else.');
  });

  await step('Click Request staff report', async () => {
    await access.requestStaffReport();
  });

  await step('Check the page says the staff report is for an admin', async () => {
    await expect(access.staff()).toHaveText('The staff report is for an admin.');
  });
});
