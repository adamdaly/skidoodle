import { Locator, Page } from "@playwright/test";
import { PageDev } from "./base-page";

export class SignIn extends PageDev {
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly ctaSubmit: Locator;

  constructor(page: Page) {
    super(page, "/sign-in");

    this.inputUsername = page.getByTestId("input-username");
    this.inputPassword = page.getByTestId("input-password");
    this.ctaSubmit = page.getByTestId("cta-submit");
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
