import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://www.wikipedia.org/' });

test.describe('testes wikipedia', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1 - Verificar se a página inicial abre', async ({ page }) => {
    await expect(page).toHaveURL('https://www.wikipedia.org/');
  });

  test('2 - Verificar o título do navegador', async ({ page }) => {
    await expect(page).toHaveTitle(/Wikipedia/);
  });
});
