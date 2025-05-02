import { Locator, Page } from "@playwright/test";

export class PageHeader {
  readonly linkLogo: Locator;
  readonly ctaSignOut: Locator;

  constructor(page: Page) {
    this.linkLogo = page.getByText("Skidoodle");
    this.ctaSignOut = page.getByTestId("cta-sign-out");
  }

  async signOut() {
    await this.ctaSignOut.click();
  }
}
