import { defineConfig, devices } from '@playwright/test';

// Each project is one live site plus one browser or viewport.
// Add a new site by adding a folder under tests/ and a project here with that site's URL.
export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  use: {
    trace: 'off',
  },
  projects: [
    {
      name: 'theqaiguy',
      testDir: './tests/theqaiguy',
      use: { baseURL: 'https://www.theqaiguy.com', ...devices['Desktop Chrome'] },
    },
    {
      name: 'theqaiguy-firefox',
      testDir: './tests/theqaiguy',
      use: { baseURL: 'https://www.theqaiguy.com', ...devices['Desktop Firefox'] },
    },
    {
      name: 'theqaiguy-webkit',
      testDir: './tests/theqaiguy',
      use: { baseURL: 'https://www.theqaiguy.com', ...devices['Desktop Safari'] },
    },
    {
      name: 'theqaiguy-mobile',
      testDir: './tests/theqaiguy',
      use: { baseURL: 'https://www.theqaiguy.com', ...devices['iPhone 14'], browserName: 'chromium' },
    },
  ],
});
