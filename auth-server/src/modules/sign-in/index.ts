import { Router } from "express";
import controller from "./sign-in.controller";

const router = Router();

router.post("/sign-in", controller.signIn);

export default router;
