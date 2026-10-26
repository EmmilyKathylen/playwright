import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    //Arrange
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
});

test ("Login válido redireciona para inventário", async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    //Act
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    //Assert
    await expect(page).toHaveURL(/inventory/); 
    await expect(loginPage.inventoryList).toBeVisible();

});

test("Login com usuário inválido mostra mensagem de erro", async () => {
    await loginPage.loginWithCredentials('Emmi', 'secret_sauce');
    await expect(loginPage.error).toBeVisible();

});

test('Tentativa de login com username vazio', async ({ page }) => {
    await loginPage.loginWithCredentials('', 'secret_sauce');
    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).toHaveText('Epic sadface: Username is required');
});

// import { test, expect } from '@playwright/test';

// test ("Login válido redireciona para inventário", async ({ page }) => {
//     await page.goto("/");

//     await page.fill("#user-name" , "standard_user"); //.fill usado para preencher campos de entrada
//     await page.fill("#password" , "secret_sauce");
//     await page.click("#login-button");

// //Matchers: verifica se o resultado esperado aconteceu 
//     await expect(page).toHaveURL(/inventory/); // confirma se a url está correta
//     await expect(page.locator(".inventory_list")).toBeVisible();

// });

// test("Login inválido mostra mensagem de erro", async ({ page }) => {
//     await page.goto("/");
    
//     await page.fill("#user-name" , "usuario_errado");
//     await page.fill("#password" , "senha_errada");
//     await expect(page.getByTestId('error')).toBeVisible();

// });