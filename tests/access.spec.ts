import { expect, practiceUser, test } from './fixtures';
import { AccessPage } from './pages/access.page';

test('signs in a member and keeps the staff report hidden', async ({ page }) => {
  const access = new AccessPage(page);
  await access.open();
  await access.signIn('member', practiceUser.password);
  await expect(access.role()).toHaveText('Signed in as member (u-member).');
  await expect(access.staffButton()).toBeHidden();
});

test('a member cannot read another person\'s note or the staff report', async ({ page }) => {
  const access = new AccessPage(page);
  await access.open();
  await access.signIn('member', practiceUser.password);
  await access.openNote('u-editor');
  await expect(access.note()).toHaveText('This note belongs to someone else.');
  await access.requestStaffReport();
  await expect(access.staff()).toHaveText('The staff report is for an admin.');
});
