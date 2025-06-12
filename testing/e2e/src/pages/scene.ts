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
    try {
      const responsePromise = this.page.waitForResponse((res) => {
        console.log("res.url()", res.url(), res.status());
        return (
          res.url().includes("http://localhost:3000/frames") &&
          res.status() === 201
        );
      });

      await this.ctaFrameCreate.click();

      const response = await responsePromise;
      try {
        return await response.json();
      } catch (e) {
        console.log("frames body error", e);
      }
    } catch (e) {
      console.log("frames error", e);
    }
  }
}
