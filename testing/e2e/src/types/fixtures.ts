import { Page } from "@playwright/test";
import { AnimationPage } from "../pages/animation";
import { Scene } from "../pages/scene";

export type CustomFixtures = {
  authenticated: Page;
  animation: AnimationPage;
  scene: Scene;
};
