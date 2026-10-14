import { test, expect } from '@playwright/test';

test ("Login válido redireciona para inventário", async ({ page }) => {
    await page.goto("/");

    await page.fill("#user-name" , "standard_user"); //.fill usado para preencher campos de entrada
    await page.fill("#password" , "secret_sauce");
    await page.click("#login-button");

//Matchers: verifica se o resultado esperado aconteceu 
    await expect(page).toHaveURL(/inventory/); // confirma se a url está correta
    await expect(page.locator(".inventory_list")).toBeVisible();

})

test("Login inválido mostra mensagem de erro", async ({ page }) => {
    await page.goto("/");
    
    await page.fill("#user-name" , "usuario_errado");
    await page.fill("#password" , "senha_errada");
    await page.click("#login-button");

})