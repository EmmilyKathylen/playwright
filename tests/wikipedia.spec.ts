import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://pt.wikipedia.org/' });

test.describe('testes wikipedia', () => {  

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1 - Verificar se a página inicial abre', async ({ page }) => {
        await expect(page).toHaveURL('https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal');
    });

  test('2 - Verificar o título do navegador', async ({ page }) => {
        await expect(page).toHaveTitle(/Wikipédia|Wikipedia/i);
    });

   test('7 - O artigo Pernambuco deve abrir via URL', async ({ page }) => {
        await page.goto('/wiki/Pernambuco');

        await expect(page).toHaveURL(/\/wiki\/Pernambuco/);
        await expect(page.locator('h1')).toContainText('Pernambuco');
    });

   test('8 - Deve informar quando a pesquisa não produz resultados', async ({ page }) => {
        const pesquisa = page.locator('input[name="search"]').first();

        await pesquisa.fill('Xyzqv987654artigo');
        await pesquisa.press('Enter');

        await expect(page.getByText('A pesquisa não produziu resultados.')).toBeVisible();
    });

});
