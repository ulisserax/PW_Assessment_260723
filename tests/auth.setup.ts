import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { requiredEnv } from "../helpers/env";

const authFile = "playwright/.auth/user.json";

test("log in and save the session state", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  // "Remember me" stores the session in localStorage, which storageState can save.
  // Without it the app uses sessionStorage, which storageState cannot capture.
  await loginPage.checkRememberMe();
  await loginPage.login(
    requiredEnv("TEST_USERNAME"),
    requiredEnv("TEST_PASSWORD")
  );
  await page.waitForURL("**/index.html");
  await page.context().storageState({ path: authFile });
});
