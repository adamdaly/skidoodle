import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/create-scene.fixture";

test.describe("Scene flow", () => {
  test("should create and append a frame to the frames list", async ({
    scene,
  }) => {
    const initialFramesLength = await scene.getFramesLength();
    await scene.frameCreate();
    const finalFramesLength = await scene.getFramesLength();
    expect(finalFramesLength).toBe(initialFramesLength + 1);
  });
});
