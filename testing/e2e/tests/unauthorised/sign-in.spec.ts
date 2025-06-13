import { readFile } from "fs/promises";
import { test, expect, Page, BrowserContext } from "@playwright/test";
import { Home } from "../../src/pages/home";
import { SignIn } from "../../src/pages/sign-in";
import { Dashboard } from "../../src/pages/dashboard";

test.describe.configure({ mode: "serial" });

test.describe("Authorisation flow", () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("should have a call-to-action available to bring the user to the sign-in page", async () => {
    const home = new Home(page);
    await home.goto();
    await home.navToSignIn();
    await expect(page).toHaveURL("/sign-in");
  });

  test("should ensure that the sign-in page has inputs for username and password and has submit button", async () => {
    const signIn = new SignIn(page);
    await signIn.goto({ waitUntil: "load" });
    await expect(page).toHaveURL("/sign-in");
    expect(signIn.inputUsername).toBeAttached();
    expect(signIn.inputPassword).toBeAttached();
    expect(signIn.ctaSubmit).toBeAttached();
    await page.screenshot({ fullPage: true, path: ".screenshots/sign-in.png" });
  });

  test("should ensure that the sign-in form can be filled in and submitted", async () => {
    const { username, password } = await readFile(
      ".state/user.json",
      "utf-8"
    ).then((data) => JSON.parse(data));

    const signIn = new SignIn(page);
    await expect(page).toHaveURL("/sign-in");
    await signIn.completeForm(username, password);

    await expect(page).toHaveURL(Dashboard.URL);
  });
});
