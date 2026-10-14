import { login } from '../helpers/auth';
import { test, expect } from '@playwright/test';

// Antes de fazer os teste faz o login
test.beforeEach(async ({ page }) => {
    await login(page);
});

test("Texto 'Products' visisível na tela de inventário", async ({ page }) => {
    await expect(page.locator(".title")).toBeVisible();
});

test("Botão para adicionar produtos ao carrinho visível na tela de inventário", async ({ page }) => {
    const button = page.getByRole("button", {name: "Add to cart"}).nth(0);
    await expect(button).toBeVisible();
});

test("Imagem de produtos visível na tela de inventário", async ({ page }) => {

    const image = page.getByAltText("Sauce Labs Backpack"); //getByAltText verifica se existe uma imagem 
    await expect(image).toBeVisible();
})



// test("imagem do produto visível na tela de inventário", async ({ page }) => {
//     await page.goto("/");

//     await page.getByRole("textbox", {name: "Username"})
//         .fill("standard_user");
        
//     await page.getByRole("textbox", {name: "Password"})
//         .fill("secret_sauce");

//     await page.getByRole("button", {name: "Login"})
//         .click();

//     const image = page.getByAltText("Sauce Lobs Backpack");
//     await expect(image).toBeVisible();
// });