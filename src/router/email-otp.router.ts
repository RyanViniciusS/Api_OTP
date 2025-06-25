import { Router } from 'express';
import { EmailOtpService } from '../controllers/email-otp.controller';
const router = Router();

router.post("/",EmailOtpService)

export default router;