import { Router } from "express";
import controller from "./token.controller";

const router = Router();

router.post("/verify", controller.verify);
router.get("/refresh", controller.refresh);

export default router;
