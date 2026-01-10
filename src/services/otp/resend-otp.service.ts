import { prisma } from "@/lib/prisma";
import { sendEmailWithOtp } from "@/utils/email-otp.utils";
import { addMinutes } from "date-fns";

export class ResendOtpService {
    async execute(email: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.ativo) {
            return;
        }

        // invalida OTPs antigos
        await prisma.otp.updateMany({
            where: {
                userId: user.id,
                used: false,
            },
            data: {
                used: true,
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.otp.create({
            data: {
                code,
                userId: user.id,
                expiresAt: addMinutes(new Date(), 10),
            },
        });

        await sendEmailWithOtp(email, code);
        console.log("NOVO OTP:", code);
    }
}
