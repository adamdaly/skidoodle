import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/sign-in.fixture";
import { Dashboard } from "../../src/pages/dashboard";

test.describe("Dashboard flow", () => {
  test("should display a message to the user if there are no animations present", async ({
    page,
  }) => {
    const dashboard = new Dashboard(page);
    await dashboard.goto({ waitUntil: "load" });
    await expect(dashboard.txtAnimationNone).toBeAttached();
  });

  test("should have a list of recents", async ({ page }) => {
    const dashboard = new Dashboard(page);
    await dashboard.goto();
    await expect(dashboard.listRecents).toBeAttached();
  });
});
