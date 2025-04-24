import { Page } from "@playwright/test";
import { PageHeader } from "./page-header";

type PageGotoOptions = Partial<Parameters<Page["goto"]>[1]>;

export class PageDev {
  readonly page: Page;
  readonly path: string;
  readonly pageHeader?: PageHeader;

  constructor(page: Page, path: string = "/", pageHeader?: PageHeader) {
    this.page = page;
    this.path = path;
    this.pageHeader = pageHeader;
  }

  async goto(options?: PageGotoOptions) {
    await this.page.goto(this.path, {
      waitUntil: "commit",
      ...options,
    });
  }
}
