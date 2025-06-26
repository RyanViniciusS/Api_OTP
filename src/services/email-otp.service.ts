// services/otp.service.ts
import { sendEmailWithOtp } from "../utils/email-otp.utils";
import { generateOTP } from "../utils/otp-generator.utils";
import { redisClient } from "../db/redis";

const OTP_TTL_SECONDS = 600; // 10 minutos

export async function createAndSendOTP(email: string): Promise<void> {
  const otp = generateOTP();
  const redisKey = `otp:${email}`;

  try {
    await sendEmailWithOtp(email, otp);
    await redisClient.set(redisKey, otp, 'EX', OTP_TTL_SECONDS);
  } catch (err) {
    console.error('Erro ao salvar OTP no Redis ou enviar e-mail:', err);
    throw err;
  }
}
