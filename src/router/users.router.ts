import { Router } from "express";
import { createUserController } from "../controllers/users.controller";
import { validate } from "../middlewares/user.middlewares";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();

router.post("/", validate(createUserSchema), createUserController);

export default router; 