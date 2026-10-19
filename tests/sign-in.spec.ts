import { expect, practiceUser, test } from './fixtures';
import { SignInPage } from './pages/sign-in.page';

test('signs in the practice account and names an empty username', async ({ page }) => {
  const signIn = new SignInPage(page);
  await signIn.open();
  await signIn.signIn(practiceUser.username, practiceUser.password);
  await expect(signIn.result()).toHaveText('Signed in as tester. This session stays in the browser.');

  await signIn.signIn('', '');
  await expect(signIn.usernameError()).toHaveText('Enter a username.');
});

test('keeps the locked practice account locked', async ({ page }) => {
  const signIn = new SignInPage(page);
  await signIn.open();
  await signIn.signIn(practiceUser.lockedUsername, practiceUser.lockedPassword);
  await expect(signIn.result()).toHaveText('This practice account is locked.');
});
