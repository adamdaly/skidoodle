import { Locator, Page } from "@playwright/test";
import { PageDev } from "./base-page";

const URL = "/confirm-registration";

export class ConfirmRegistration extends PageDev {
  static readonly URL = URL;
  readonly inputUsername: Locator;
  readonly inputConfirmationCode: Locator;
  readonly ctaSubmit: Locator;

  constructor(page: Page) {
    super(page, URL);

    this.inputUsername = page.getByTestId("input-register-confirm-username");
    this.inputConfirmationCode = page.getByTestId(
      "input-register-confirm-confirmationCode"
    );
    this.ctaSubmit = page.getByTestId("cta-register-confirm-submit");
  }

  async fillForm(username?: string) {
    await this.inputUsername.fill(
      username ?? process.env.PLAYWRIGHT_USER_USERNAME ?? ""
    );
    await this.inputConfirmationCode.fill("confirmationCode");
  }

  async submitForm() {
    this.ctaSubmit.click();
  }

  async completeForm(username: string) {
    await this.fillForm(username);
    await this.submitForm();
  }
}
