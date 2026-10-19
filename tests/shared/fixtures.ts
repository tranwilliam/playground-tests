import { test as base } from '@playwright/test';

// Shared by tests/playground, tests/labs, and tests/qaflix. All of those hit https://www.theqaiguy.com
export const site = {
  name: 'theQAIguy',
  origin: 'https://www.theqaiguy.com',
} as const;

// Shared practice data. These are fake. Nothing is charged. Nothing is stored on a server.
export const practiceUser = {
  username: 'tester',
  password: 'practice-only',
  lockedUsername: 'locked',
  lockedPassword: 'locked',
} as const;

export const practiceCard = {
  name: 'Practice Tester',
  accepted: '4242 4242 4242 4242',
  declined: '4000 0000 0000 0002',
  expiry: '12/30',
  cvc: '123',
} as const;

export type QaflixAccount = {
  name: string;
  email: string;
  password: string;
};

export const test = base.extend<{ qaflixAccount: QaflixAccount }>({
  // Skip the QAflix intro sting so the test can see the next page.
  page: async ({ page }, use) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await use(page);
  },
  // A new fake email every run so sign-up does not collide with an old browser account.
  qaflixAccount: async ({}, use) => {
    await use({
      name: 'Ada Tester',
      email: `tester.${Date.now()}@example.com`,
      password: 'secret1',
    });
  },
});

export { expect } from '@playwright/test';

/** Print a line in the terminal and group the same text in the Playwright report. */
export async function step(title: string, run: () => Promise<void>) {
  console.log(`→ ${title}`);
  await test.step(title, run);
}
