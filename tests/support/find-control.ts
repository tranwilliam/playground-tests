import type { Locator, Page } from '@playwright/test';

/** Prefer the accessible name. Fall back to a test id if the name is gone. */
export async function findControl(
  page: Page,
  options: { role: 'button'; name: string; testId?: string },
): Promise<Locator> {
  const byRole = page.getByRole(options.role, { name: options.name, exact: true });
  if (await byRole.count()) return byRole;
  if (options.testId) return page.getByTestId(options.testId);
  return byRole;
}
