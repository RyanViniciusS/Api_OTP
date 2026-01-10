import { Router } from 'express';
import { VerifyOtpController } from '@/controllers/otp/verify-otp.controller';
import { validate } from '@/middlewares/user.middlewares';
import { verifyOtpSchema } from '@/schemas/emailopt.schema';
import { ResendOtpController } from '@/controllers/otp/resend-otp.controller';

const router = Router();

router.post("/verify", validate(verifyOtpSchema), VerifyOtpController);
router.post("/reset", ResendOtpController);

export default router;