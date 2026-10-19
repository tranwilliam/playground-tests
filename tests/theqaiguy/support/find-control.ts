import type { Locator, Page } from '@playwright/test';

// Look up a button the way a person would: by the words on it.
// If that name is gone (the locators lab ships a redesign), try the test id.
export async function findControl(
  page: Page,
  options: { role: 'button'; name: string; testId?: string },
): Promise<Locator> {
  const byRole = page.getByRole(options.role, { name: options.name, exact: true });
  if (await byRole.count()) return byRole;
  if (options.testId) return page.getByTestId(options.testId);
  return byRole;
}
