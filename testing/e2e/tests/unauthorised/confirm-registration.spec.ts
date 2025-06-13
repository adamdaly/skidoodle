import { faker } from "@faker-js/faker";
import { test, expect, Page, BrowserContext } from "@playwright/test";
import { Home } from "../../src/pages/home";
import { SignIn } from "../../src/pages/sign-in";
import { Register } from "../../src/pages/register";
import { ConfirmRegistration } from "../../src/pages/confirm-registration";
import { Dashboard } from "../../src/pages/dashboard";

test.describe.configure({ mode: "serial" });

test.describe("Confirm Registration flow", async () => {
  let page: Page;
  let context: BrowserContext;
  const username = faker.internet.email();
  const password = faker.string.alphanumeric({ length: 10 });

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("should contain a form with username and confirmation code fields", async () => {
    const home = new Home(page);
    await home.goto();
    await home.navToRegister();
    await page.waitForURL(Register.URL);
    const register = new Register(page);
    await register.completeForm(username, password);

    await page.waitForURL(ConfirmRegistration.URL);

    const confirmationCode = new ConfirmRegistration(page);
    expect(confirmationCode.inputUsername).toBeAttached();
    expect(confirmationCode.inputConfirmationCode).toBeAttached();
    expect(confirmationCode.ctaSubmit).toBeAttached();
  });

  test("should confirm the registration of a user", async () => {
    const confirmationCode = new ConfirmRegistration(page);
    confirmationCode.completeForm(username);
    await expect(page).toHaveURL(SignIn.URL);
  });

  test("should ensure that the dashboard page has a sign-out call-to-action", async () => {
    const signIn = new SignIn(page);
    await signIn.completeForm(username, password);
    await expect(page).toHaveURL(Dashboard.URL);

    const dashboard = new Dashboard(page);
    await dashboard.pageHeader?.ctaSignOut.click();
    await expect(page).toHaveURL("/signed-out");
    await page.screenshot({
      fullPage: true,
      path: ".screenshots/signed-out.png",
    });
  });
});
