import { Locator, Page } from "@playwright/test";
import { PageDev } from "./base-page";
import { PageHeader } from "./page-header";

export class Dashboard extends PageDev {
  readonly header: PageHeader;
  readonly listAnimations: Locator;
  readonly listRecents: Locator;
  readonly titleAnimationCreate: Locator;
  readonly ctaAnimationCreate: Locator;
  readonly inputAnimationCreateName: Locator;
  readonly inputAnimationCreateWidth: Locator;
  readonly inputAnimationCreateHeight: Locator;
  readonly inputAnimationCreateFramerate: Locator;
  readonly ctaAnimationCreateCancel: Locator;
  readonly ctaAnimationCreateSubmit: Locator;
  readonly txtAnimationNone: Locator;

  constructor(page: Page) {
    super(page, "/dashboard", new PageHeader(page));
    this.listAnimations = page.getByTestId("list-animations");
    this.listRecents = page.getByTestId("list-recents");

    this.ctaAnimationCreate = page.getByTestId("cta-animation-create");
    this.titleAnimationCreate = page.getByTestId("title-animation-create");
    this.inputAnimationCreateName = page.getByTestId(
      "input-animation-create-name"
    );
    this.inputAnimationCreateWidth = page.getByTestId(
      "input-animation-create-width"
    );
    this.inputAnimationCreateHeight = page.getByTestId(
      "input-animation-create-height"
    );
    this.inputAnimationCreateFramerate = page.getByTestId(
      "input-animation-create-framerate"
    );
    this.ctaAnimationCreateCancel = page.getByTestId(
      "cta-animation-create-cancel"
    );
    this.ctaAnimationCreateSubmit = page.getByTestId(
      "cta-animation-create-submit"
    );
    this.txtAnimationNone = page.getByTestId("txt-list-animation-none");
  }

  getAnimationCreateDialog() {
    return this.page.getByTestId("dialog-animation-create");
  }

  async fillAnimationCreateForm() {
    await this.inputAnimationCreateName.fill("Test Animation");
    await this.inputAnimationCreateWidth.fill("1024");
    await this.inputAnimationCreateHeight.fill("576");
    await this.inputAnimationCreateFramerate.fill("30");
  }

  async submitAnimationCreateForm() {
    await this.ctaAnimationCreateSubmit.click();
  }

  async completeAnimationCreateForm() {
    await this.ctaAnimationCreate.click();
    const animationCreateDialog = this.getAnimationCreateDialog();
    animationCreateDialog.waitFor({ state: "attached" });
    await this.fillAnimationCreateForm();
    await this.submitAnimationCreateForm();
  }
}
