import { test as base } from "@playwright/test";
import { readFile } from "fs/promises";
import { Dashboard } from "../pages/dashboard";
import { SignIn } from "../pages/sign-in";
import { CustomFixtures } from "../types";

export const test = base.extend<CustomFixtures>({
  authenticated: async ({ page }, use) => {
    const { username, password } = await readFile(
      ".state/user.json",
      "utf-8"
    ).then((data) => JSON.parse(data));
    const signIn = new SignIn(page);
    await signIn.goto();
    await signIn.completeForm(username, password);
    await page.waitForURL(Dashboard.URL);
    await use(page);
  },
});
