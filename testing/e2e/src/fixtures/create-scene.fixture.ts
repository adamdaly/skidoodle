import { Scene } from "../pages/scene";
import { CustomFixtures } from "../types";
import { test as base } from "./create-animation.fixture";

export const test = base.extend<CustomFixtures>({
  scene: async ({ animation }, use) => {
    await animation.ctaSceneCreate.click();

    const responsePromise = animation.page.waitForResponse(
      (res) => res.url().includes("/scenes") && res.status() === 201
    );

    await animation.completeSceneCreateForm();

    const response = await responsePromise;
    const createdSceneData = await response.json();

    await animation.page.goto(`scenes/${createdSceneData.id}`);

    const scene = new Scene(animation.page, createdSceneData.id);
    await use(scene);
  },
});
