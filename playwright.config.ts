import { defineConfig, devices } from '@playwright/test';

const theqaiguy = {
  baseURL: 'https://www.theqaiguy.com',
} as const;

// Folders under tests/ are products (playground hub, labs, QAflix).
// These projects all point at theQAIguy. Add a new site as a new folder plus a new project with that site's URL.
export default defineConfig({
  testDir: './tests',
  testIgnore: '**/shared/**',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  use: {
    trace: 'off',
  },
  projects: [
    {
      name: 'theqaiguy',
      use: { ...theqaiguy, ...devices['Desktop Chrome'] },
    },
    {
      name: 'theqaiguy-firefox',
      use: { ...theqaiguy, ...devices['Desktop Firefox'] },
    },
    {
      name: 'theqaiguy-webkit',
      use: { ...theqaiguy, ...devices['Desktop Safari'] },
    },
    {
      name: 'theqaiguy-mobile',
      use: { ...theqaiguy, ...devices['iPhone 14'], browserName: 'chromium' },
    },
  ],
});
