import { test as base } from '@playwright/test';

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
  page: async ({ page }, use) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await use(page);
  },
  qaflixAccount: async ({}, use) => {
    await use({
      name: 'Ada Tester',
      email: `tester.${Date.now()}@example.com`,
      password: 'secret1',
    });
  },
});

export { expect } from '@playwright/test';
