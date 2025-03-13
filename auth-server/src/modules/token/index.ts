import { Router } from "express";
import controller from "./token.controller";

const router = Router();

router.get("/verify", controller.verify);
router.get("/refresh", controller.refresh);

export default router;
