import { Dashboard } from "../pages/dashboard";
import { AnimationPage } from "../pages/animation";
import { CustomFixtures } from "../types";
import { test as base } from "./sign-in.fixture";

export const test = base.extend<CustomFixtures>({
  animation: async ({ page }, use) => {
    const dashboard = new Dashboard(page);
    await dashboard.goto();

    const responsePromise = dashboard.page.waitForResponse(
      (res) => res.url().includes("/animations") && res.status() === 201
    );

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
