import { expect, practiceUser, step, test } from './fixtures';
import { SignInPage } from './pages/sign-in.page';

// Sign-in lab: a fake login form. tester / practice-only should work.
// locked / locked should stay locked. An empty username should name that field.

test('signs in the practice account and names an empty username', async ({ page }) => {
  const signIn = new SignInPage(page);

  await step('Open the sign-in lab', async () => {
    await signIn.open();
  });

  await step(`Type username "${practiceUser.username}" and password "${practiceUser.password}", then click Sign in`, async () => {
    await signIn.signIn(practiceUser.username, practiceUser.password);
  });

  await step('Check the page says we signed in as tester and the session stays in the browser', async () => {
    await expect(signIn.result()).toHaveText('Signed in as tester. This session stays in the browser.');
  });

  await step('Clear both fields and click Sign in again', async () => {
    await signIn.signIn('', '');
  });

  await step('Check the username field shows "Enter a username."', async () => {
    await expect(signIn.usernameError()).toHaveText('Enter a username.');
  });
});

test('keeps the locked practice account locked', async ({ page }) => {
  const signIn = new SignInPage(page);

  await step('Open the sign-in lab', async () => {
    await signIn.open();
  });

  await step(`Type username "${practiceUser.lockedUsername}" and password "${practiceUser.lockedPassword}", then click Sign in`, async () => {
    await signIn.signIn(practiceUser.lockedUsername, practiceUser.lockedPassword);
  });

  await step('Check the page still says this practice account is locked', async () => {
    await expect(signIn.result()).toHaveText('This practice account is locked.');
  });
});
