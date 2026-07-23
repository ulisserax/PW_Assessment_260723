import { expect, test } from "@playwright/test";
import { DashboardPage, NewProduct } from "../pages/dashboard-page";
import { randomId } from "../helpers/random-data";

test.describe("Product management", () => {
  test("creates, filters and deletes a product", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const id = randomId();
    const product: NewProduct = {
      name: `Automation Laptop ${id}`,
      sku: `SKU-${id}`,
      price: "1500",
      category: "Electronics",
    };

    await dashboardPage.goto();
    await expect(dashboardPage.welcomeMessage).toContainText("Welcome");

    await test.step("create the product", async () => {
      await expect(dashboardPage.inStockCheckbox).toBeChecked();
      await dashboardPage.addProduct(product);
      await expect(dashboardPage.productHeading(product.name)).toBeVisible();
    });

    await test.step("filter by the Electronics category", async () => {
      await dashboardPage.filterByCategory(product.category);
      await expect(dashboardPage.productHeading(product.name)).toBeVisible();
    });

    await test.step("delete the product", async () => {
      await dashboardPage.deleteProduct(product.name);
      await expect(dashboardPage.productHeading(product.name)).toHaveCount(0);
    });
  });
});
