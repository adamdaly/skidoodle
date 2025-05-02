import { Locator, Page } from "@playwright/test";
import { PageDev } from "./base-page";

export class Register extends PageDev {
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly ctaSubmit: Locator;

  constructor(page: Page) {
    super(page, "/register");

    this.inputUsername = page.getByTestId("input-register-username");
    this.inputPassword = page.getByTestId("input-register-password");
    this.ctaSubmit = page.getByTestId("cta-register-submit");
  }

  async fillForm(username?: string, password?: string) {
    await this.inputUsername.fill(
      username ?? process.env.PLAYWRIGHT_USER_USERNAME ?? ""
    );
    await this.inputPassword.fill(
      password ?? process.env.PLAYWRIGHT_USER_PASSWORD ?? ""
    );
  }

  async submitForm() {
    this.ctaSubmit.click();
  }

  async completeForm(username: string, password: string) {
    await this.fillForm(username, password);
    await this.submitForm();
  }
}
