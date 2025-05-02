import { Locator, Page } from "@playwright/test";
import { PageDev } from "./base-page";
import { PageHeader } from "./page-header";

export class Scene extends PageDev {
  readonly listFrames: Locator;
  readonly ctaFrameCreate: Locator;

  constructor(page: Page, id: number) {
    super(page, `/animations/${id}`, new PageHeader(page));

    this.listFrames = page.getByTestId("list-frames");
    this.ctaFrameCreate = page.getByTestId("cta-frame-create");
  }

  async getFramesLength() {
    return await this.listFrames.getByRole("listitem").count();
  }

  async frameCreate() {
    const responsePromise = this.page.waitForResponse(
      (res) => res.url().includes("/frames") && res.status() === 201
    );

    await this.ctaFrameCreate.click();

    const response = await responsePromise;
    return await response.json();
  }
}
