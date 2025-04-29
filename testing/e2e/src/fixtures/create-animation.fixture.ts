import { Dashboard } from "../pages/dashboard";
import { AnimationPage } from "../pages/animation";
import { CustomFixtures } from "../types";
import { test as base } from "./sign-in.fixture";

export const test = base.extend<CustomFixtures>({
  animation: async ({ page }, use, testInfo) => {
    const dashboard = new Dashboard(page);
    await dashboard.goto({ waitUntil: "load" });

    const responsePromise = dashboard.page.waitForResponse(
      (res) => res.url().includes("/animations") && res.status() === 201
    );

    const screenshot = await page.screenshot();
    await testInfo.attach("screenshot", {
      body: screenshot,
      contentType: "image/png",
    });

    await dashboard.completeAnimationCreateForm();

    const response = await responsePromise;
    const createdAnimationData = await response.json();

    await dashboard.page.waitForURL(`/animations/${createdAnimationData.id}`);

    const animation = new AnimationPage(
      dashboard.page,
      createdAnimationData.id
    );

    await use(animation);
  },
});
