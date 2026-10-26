import { Page, Locator} from "@playwright/test";

export class LoginPage {
    readonly page: Page; //criando um atibuto page do tipo page 
    readonly inventoryList: Locator;
    readonly error: Locator

    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.locator(".inventory_list");
        this.error = page.getByTestId('error');
    };

    async navigateToLoginPage() { //navegação 
        await this.page.goto('/');
    };

    async loginWithCredentials(user: string, password: string) {
        await this.page.fill('#user-name', user);
        await this.page.fill('#password', password);
        await this.page.getByRole('button', {name: 'Login'}).click();
    };
};
