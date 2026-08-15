import { test, expect } from '@playwright/test';

test('agregar tareas', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Aprender Playwright');
  await input.press('Enter');

  await input.fill('Automatizar pruebas');
  await input.press('Enter');

  await expect(page.getByTestId('todo-item')).toHaveCount(2);
});
