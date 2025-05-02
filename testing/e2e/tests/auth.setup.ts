import { test as setup } from "@playwright/test";
import { Home } from "../src/pages/home";
import { SignIn } from "../src/pages/sign-in";
import { Register } from "../src/pages/register";
import { faker } from "@faker-js/faker";
import { writeFile } from "fs/promises";

setup("Setup - Register and Sign-in new user", async ({ page }) => {
  const username = faker.internet.email();
  const password = faker.string.alphanumeric({ length: 10 });

  const home = new Home(page);
  await home.goto();
  await home.ctaRegister.isVisible();

  await home.navToRegister();
  await page.waitForURL("/register");

  const register = new Register(page);
  await register.completeForm(username, password);

  await page.waitForURL("/sign-in");

  const signIn = new SignIn(page);
  await signIn.completeForm(username, password);

  await page.waitForURL("/dashboard");

  await writeFile(".state/user.json", JSON.stringify({ username, password }));

  await page.context().storageState({ path: ".state/session.json" });
});
