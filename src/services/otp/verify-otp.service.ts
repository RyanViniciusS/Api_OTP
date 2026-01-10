import { prisma } from "../../lib/prisma";
import { VerifyOtpInput } from "../../schemas/emailopt.schema";

export class VerifyOtpService {
    async verifyOtp({ email, otp }: VerifyOtpInput) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        const otpRecord = await prisma.otp.findFirst({
            where: {
                userId: user.id,
                code: otp,
                used: false,
                expiresAt: { gt: new Date() },
            },
        });

        if (!otpRecord) {
            throw new Error("OTP_INVALID");
        }

        await prisma.otp.update({
            where: { id: otpRecord.id },
            data: { used: true },
        });

        await prisma.user.update({
            where: { id: user.id },
            data: { ativo: true },
        });

        return true;
    }
}


