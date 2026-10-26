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

    await expect(page.locator('h1')).toContainText('Brasil');
  });

  test('5 - Clicar em um link para outros artigos', async ({ page }) => {
    const secao = page.getByRole('cell', { name: 'Boas-vindas à Wikipédia, a' })
    await secao.getByRole('link', { name: 'Wikipédia' }).click();
    await expect(page).toHaveURL(/\/wiki\/Wikip%C3%A9dia/)
  });
  
  test('6 - Passar o mouse sobre um link sem clicar deve aparecer uma prévia', async ({ page }) => {
    await page.goto('\/wiki\/Cachorro')
    await page.getByRole('link', {name: 'Vira-lata caramelo', exact: true}).hover();
    const previa = page.locator('.mwe-popups')
    await expect(previa).toBeVisible()
  });

  test('7 - Acessar artigo via URL', async ({ page }) => {
    await page.goto('/wiki/Pernambuco');

    await expect(page).toHaveURL(/wiki\/Pernambuco/);
    await expect(page.locator('h1')).toContainText('Pernambuco');
  });

  test('8 - Deve informar quando a pesquisa não produz resultados', async ({ page }) => {
    const pesquisa = page.locator('#searchInput');

    await pesquisa.fill('Xyzqv987654ar');
    await pesquisa.press('Enter');

    await expect(page.getByText('A pesquisa não produziu resultados')).toBeVisible();
  });

  test('9 - Url "/wiki/Especial:Aleatória" mostra artigos diferentes', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await page.goto('/wiki/Especial:Aleatória')
      await expect(page).not.toHaveURL(/Especial:Aleat/);
      await expect(page.locator('h1')).toBeVisible()

      if (i<2){
        await page.waitForTimeout(3000)
    }
    }
  });

  test('10 - Trocar o idioma também troca a url', async ({ page }) => {
    await page.goto('/wiki/Computador')
    await page.getByRole('button', {name:'248 idiomas'}).click()
    const secao_idiomas = await page.getByRole('listbox', { name: 'Todos os idiomas' })
    await secao_idiomas.getByRole('option', {name: 'English'}).click()
    await expect(page).toHaveURL(/en.wikipedia/)
  })
});

