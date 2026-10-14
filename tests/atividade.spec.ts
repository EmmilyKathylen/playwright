import { login } from "../helpers/auth";
import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await login(page);
});

test.describe ("Teste do produto Sauce Labs Bike Light", async () => {
   
    test("Botão para adicionar produtos ao carrinho visível na tela de inventário", async ({ page }) => {
        const button = page.getByRole("button", {name: "Add to cart"}).nth(1);
        await expect(button).toBeVisible();
        await button.click();
    });

    test("Título do produto visível na tela de inventário", async ({ page }) => {
        const titulo = page.getByText("Sauce Labs Bike Light");
        await expect(titulo).toBeVisible();
    });

    test("Imagem de produtos visível na tela de inventário", async ({ page }) => {
        const image = page.getByAltText("Sauce Labs Bike Light"); 
        await expect(image).toBeVisible();
    });

    test("Preço do produto está visível na tela de inventário", async ({ page }) => {
        // const preco = page.getByText("$9.99")
        const preco = page.locator('[data-test="inventory-item-price"]').nth(1)
        await expect(preco).toHaveText("$9.99")
        await expect(preco).toBeVisible();
    });

});