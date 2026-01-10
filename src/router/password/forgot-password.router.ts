import { completePasswordReset, passwordResetRoutes } from '@/controllers/password/forgot-password';
import { Router } from 'express';

const router = Router();

router.post("/request", passwordResetRoutes);
router.post("/confirm", completePasswordReset);

export default router;