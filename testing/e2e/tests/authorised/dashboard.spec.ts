import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/sign-in.fixture";
import { Dashboard } from "../../src/pages/dashboard";

test.describe("Dashboard flow", () => {
  test("should have a list of recents", async ({ page }) => {
    const dashboard = new Dashboard(page);
    await dashboard.goto();
    await expect(dashboard.listRecents).toBeAttached();
  });
});
