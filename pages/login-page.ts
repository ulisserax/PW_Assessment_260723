import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly signInButton: Locator;
  readonly errorAlert: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.rememberMeCheckbox = page.getByLabel("Remember me");
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.errorAlert = page.locator("#login-alert");
    this.usernameError = page.locator("#username-error");
    this.passwordError = page.locator("#password-error");
    this.registerLink = page.getByRole("link", { name: "Register here" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/login.html");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async checkRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.check();
  }

  async goToRegistration(): Promise<void> {
    await this.registerLink.click();
  }
}
