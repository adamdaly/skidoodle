import { faker } from "@faker-js/faker";
import { writeFile } from "fs/promises";
import { test as setup } from "@playwright/test";
import { Home } from "../src/pages/home";
import { SignIn } from "../src/pages/sign-in";
import { Register } from "../src/pages/register";
import { ConfirmRegistration } from "../src/pages/confirm-registration";

setup("Setup - Register and Sign-in new user", async ({ page }) => {
  const username = faker.internet.email();
  const password = faker.string.alphanumeric({ length: 10 });

  const home = new Home(page);
  await home.goto();
  await home.ctaRegister.isVisible();

  await home.navToRegister();
  await page.waitForURL(Register.URL);

  const register = new Register(page);
  await register.completeForm(username, password);

  await page.waitForURL(ConfirmRegistration.URL);
  const confirmRegistration = new ConfirmRegistration(page);
  await confirmRegistration.completeForm(username);

  await page.waitForURL(SignIn.URL);
  const signIn = new SignIn(page);
  await signIn.completeForm(username, password);

  const responsePromise = page.waitForResponse((res) =>
    res.url().includes("/sign-in")
  );

  await responsePromise;

  await writeFile(".state/user.json", JSON.stringify({ username, password }));

  await page.context().storageState({ path: ".state/session.json" });
});
