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

  test('3 - Verificar se o campo de pesquisa está visível', async ({ page }) => {
    const campoPesquisa = page.locator('#searchInput');
    await expect(campoPesquisa).toBeVisible();
  });
  
  test('4 - Pesquisar um artigo', async ({ page }) => {
    const campoPesquisa = page.locator('#searchInput');
    await campoPesquisa.fill('Brasil');
    await campoPesquisa.press('Enter');
    await expect(page).toHaveURL(/Brasil/);
  });

  test('5 - Clicar em links para outros artigos', async ({ page }) => {
    const secao = await page.getByRole('cell', { name: 'Boas-vindas à Wikipédia, a' })
    await secao.getByRole('link', { name: 'Wikipédia' }).click();
    await expect(page).toHaveURL(/\/wiki\/Wikip%C3%A9dia/)
  });
  
  test('6 - Passar o mouse sobre um link sem clicar deve aparecer uma prévia', async ({ page }) => {
    await page.goto('\/wiki\/Cachorro')
    await page.getByRole('link', {name: 'Vira-lata caramelo', exact: true}).hover();
    await page.waitForTimeout(3500)
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
