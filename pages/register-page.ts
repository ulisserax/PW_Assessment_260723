import { Locator, Page } from "@playwright/test";

export type NewUser = {
  username: string;
  email: string;
  password: string;
};

export class RegisterPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#reg-username");
    this.emailInput = page.locator("#reg-email");
    this.passwordInput = page.locator("#reg-password");
    this.confirmPasswordInput = page.locator("#reg-confirm-password");
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.successAlert = page.locator("#register-alert");
  }

  async register(user: NewUser): Promise<void> {
    await this.usernameInput.fill(user.username);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }
}
