import { Locator, Page } from "@playwright/test";

export type NewProduct = {
  name: string;
  sku: string;
  price: string;
  category: string;
};

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly nameInput: Locator;
  readonly skuInput: Locator;
  readonly priceInput: Locator;
  readonly categorySelect: Locator;
  readonly inStockCheckbox: Locator;
  readonly saveButton: Locator;
  readonly categoryFilter: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator("#user-info");
    this.nameInput = page.locator("#product-name");
    this.skuInput = page.locator("#product-sku");
    this.priceInput = page.locator("#product-price");
    this.categorySelect = page.locator("#product-category");
    this.inStockCheckbox = page.locator("#product-inStock");
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.categoryFilter = page.getByLabel("Filter by category");
    this.confirmDeleteButton = page.locator("#modal-confirm-btn");
  }

  async goto(): Promise<void> {
    await this.page.goto("/index.html");
  }

  async addProduct(product: NewProduct): Promise<void> {
    await this.nameInput.fill(product.name);
    await this.skuInput.fill(product.sku);
    await this.priceInput.fill(product.price);
    await this.categorySelect.selectOption(product.category);
    await this.saveButton.click();
  }

  async filterByCategory(category: string): Promise<void> {
    await this.categoryFilter.selectOption(category);
  }

  async deleteProduct(name: string): Promise<void> {
    await this.page.getByRole("button", { name: `Delete ${name}` }).click();
    await this.confirmDeleteButton.click();
  }

  productHeading(name: string): Locator {
    return this.page.getByRole("heading", { name });
  }
}
