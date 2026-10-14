import { test, expect } from '@playwright/test';

test("Botão de login visível para usuário", async ({ page }) => {
    await page.goto("/");

    const button = page.getByRole("button" , { name: "Login"}); //faz a ação de busca 

    await expect(button).toBeVisible();
})