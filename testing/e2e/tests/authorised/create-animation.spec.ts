import { test, expect } from "@playwright/test";
import { Dashboard } from "../../src/pages/dashboard";

test.describe("Create animation flow", () => {
  test("should ensure the user has a control to open the Create Animation modal", async ({
    page,
  }) => {
    const dashboard = new Dashboard(page);
    await dashboard.goto();
    await expect(dashboard.ctaAnimationCreate).toBeAttached();
  });

  test("should open the Create Animation modal when the trigger is clicked", async ({
    page,
  }) => {
    const dashboard = new Dashboard(page);
    await dashboard.goto({ waitUntil: "load" });
    await expect(dashboard.ctaAnimationCreate).toBeAttached();
    await dashboard.ctaAnimationCreate.click();
    await expect(dashboard.titleAnimationCreate).toBeAttached();
  });

  test("should create an animation and add it to the dashboard animation list once the Create Animation form has been complete", async ({
    page,
  }) => {
    const dashboard = new Dashboard(page);
    await dashboard.goto({ waitUntil: "load" });
    await expect(dashboard.ctaAnimationCreate).toBeAttached();
    await dashboard.completeAnimationCreateForm();
    await expect(dashboard.page).toHaveURL(/animations\/\d+$/);
    const url = new URL(page.url());
    await dashboard.goto({ waitUntil: "load" });
    await expect(dashboard.listAnimations).toBeAttached();
    const listItems = await dashboard.listAnimations
      .getByRole("listitem")
      .all();
    const hrefs = await Promise.all(
      listItems.map(
        async (listItem) =>
          await listItem.getByRole("link").getAttribute("href")
      )
    );

    await expect(hrefs).toContain(url.pathname);
  });
});
