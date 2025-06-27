import { Router } from 'express';
import { EmailOtpController, VerifyOtpController } from '../controllers/email-otp.controller';
import { validate } from '../middlewares/user.middlewares';
import { otpschema } from '../schemas/emailopt.schema';
const router = Router();

router.post("/send", EmailOtpController);
router.post("/verify", validate(otpschema), VerifyOtpController);


export default router;