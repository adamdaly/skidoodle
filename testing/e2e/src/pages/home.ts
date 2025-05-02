import { Locator, Page } from "@playwright/test";
import { PageDev } from "./base-page";

export class Home extends PageDev {
  readonly ctaSignIn: Locator;
  readonly ctaRegister: Locator;

  constructor(page: Page) {
    super(page, "/");
    this.ctaSignIn = page.getByTestId("cta-sign-in");
    this.ctaRegister = page.getByTestId("cta-register");
  }

  async navToSignIn() {
    await this.ctaSignIn.click();
  }

  async navToRegister() {
    await this.ctaRegister.click();
  }
}
