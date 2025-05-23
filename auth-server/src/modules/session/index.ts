import { Router } from "express";
import controller from "./session.controller";

const router = Router();

router.get("/validate", controller.validate);
router.get("/refresh", controller.refresh);

export default router;
