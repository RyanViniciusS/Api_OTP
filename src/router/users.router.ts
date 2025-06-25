import { Router } from "express";
import { createUser } from "../controllers/users.controller";
import { validate } from "../middlewares/user.middlewares";
import { createUserSchema } from "../schemas/schemas";
const router = Router();

router.post("/", validate(createUserSchema), createUser);

export default router; 