import { Router } from "express";
import controller from "./register.controller";

const router = Router();

router.post("/register", controller.register);

export default router;
