import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { RegisterPage } from "../pages/register-page";
import { requiredEnv } from "../helpers/env";
import { randomId } from "../helpers/random-data";

test.describe("Registration", () => {
  test("registers a new user and returns to the login page", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const id = randomId();

    await loginPage.goto();
    await loginPage.goToRegistration();
    await expect(page).toHaveURL(/register\.html/);

    await registerPage.register({
      username: `user_${id}`,
      email: `user_${id}@test.com`,
      password: requiredEnv("REGISTER_PASSWORD"),
    });

    await expect(registerPage.successAlert).toHaveText(
      "Registration successful! Redirecting to login..."
    );
    await expect(page).toHaveURL(/login\.html/);
  });
});
