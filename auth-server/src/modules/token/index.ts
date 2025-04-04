import { Router } from "express";
import controller from "./token.controller";

const router = Router();

router.post("/verify", controller.verify);
router.post("/refresh", controller.refresh);

export default router;
