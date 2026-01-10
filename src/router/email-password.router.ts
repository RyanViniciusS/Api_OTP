import { Router } from "express";
import { requestPasswordResetController } from "../controllers/email-password.controller";

const router = Router();

router.post("/reset", requestPasswordResetController);

export default router;