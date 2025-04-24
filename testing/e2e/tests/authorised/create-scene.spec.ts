import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/create-animation.fixture";

test.describe("Create Scene flow", () => {
  test("should ensure the user can complete the Create Scene form and submit it", async ({
    animation,
  }) => {
    const initialLength = await animation.getScenesLength();
    await animation.ctaSceneCreate.waitFor({ state: "attached" });
    await animation.ctaSceneCreate.click();
    await animation.completeSceneCreateForm();
    await animation.getSceneCreateDialog().waitFor({ state: "detached" });
    const finalLength = await animation.getScenesLength();
    expect(finalLength).toBe(initialLength);
  });
});
