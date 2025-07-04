import { Router } from "express";
import controller from "./session.controller";

const router = Router();

router.get("/validate", controller.validate);
router.get("/refresh", controller.refresh);
router.get("/get-current-user", controller.getCurrentUser);

export default router;
