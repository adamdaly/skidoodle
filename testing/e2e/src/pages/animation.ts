import { Locator, Page } from "@playwright/test";
import { PageDev } from "./base-page";
import { PageHeader } from "./page-header";

export class AnimationPage extends PageDev {
  readonly listScenes: Locator;
  readonly ctaSceneCreate: Locator;
  readonly inputSceneCreateName: Locator;
  readonly inputSceneCreateIndex: Locator;
  readonly ctaSceneCreateCancel: Locator;
  readonly ctaSceneCreateSubmit: Locator;

  constructor(page: Page, id: number) {
    super(page, `/animations/${id}`, new PageHeader(page));

    this.listScenes = page.getByTestId("list-scenes");
    this.ctaSceneCreate = page.getByTestId("cta-scene-create");
    this.inputSceneCreateName = page.getByTestId("input-scene-create-name");
    this.inputSceneCreateIndex = page.getByTestId("input-scene-create-index");
    this.ctaSceneCreateCancel = page.getByTestId("cta-scene-create-cancel");
    this.ctaSceneCreateSubmit = page.getByTestId("cta-scene-create-submit");
  }

  async getScenesLength() {
    await this.listScenes.getByRole("listitem").count;
  }

  getSceneCreateDialog() {
    return this.page.getByTestId("dialog-scene-create");
  }

  async fillSceneCreateForm() {
    await this.inputSceneCreateName.fill("Test Scene");
  }

  async submitSceneCreateForm() {
    await this.ctaSceneCreateSubmit.click();
  }

  async completeSceneCreateForm() {
    await this.fillSceneCreateForm();
    await this.submitSceneCreateForm();
  }
}
