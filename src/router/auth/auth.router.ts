import { LoginController } from '@/controllers/auth/login.controller';
import { LogoutController } from '@/controllers/auth/logout.controller';
import { meController } from '@/controllers/auth/me.controller';
import { refreshController } from '@/controllers/auth/refresh.controller';
import { authGuard } from '@/middlewares/auth.jwt';
import { Router } from 'express';
const router = Router();

router.post("/login", LoginController);
router.get("/me", authGuard, meController);
router.post("/refresh", refreshController);
router.post("/logout", authGuard, LogoutController);


export default router;