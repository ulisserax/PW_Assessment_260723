import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { DashboardPage } from "../pages/dashboard-page";
import { requiredEnv } from "../helpers/env";

test.describe("Login", () => {
  test("shows required field messages when the form is submitted empty", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.signInButton.click();

    await expect(loginPage.usernameError).toHaveText("Username is required");
    await expect(loginPage.passwordError).toHaveText("Password is required");
  });

  test("shows an error message for invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("wrong-user", "wrong-password");

    await expect(loginPage.errorAlert).toHaveText(
      "Invalid username or password"
    );
  });

  test("logs in with valid credentials and lands on the dashboard", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const username = requiredEnv("TEST_USERNAME");

    await loginPage.goto();
    await loginPage.login(username, requiredEnv("TEST_PASSWORD"));

    await expect(page).toHaveURL(/index\.html/);
    await expect(dashboardPage.welcomeMessage).toHaveText(
      `Welcome, ${username}!`
    );
  });
});
