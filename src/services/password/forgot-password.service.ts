// src/services/PasswordResetService.ts
import { prisma } from "@/lib/prisma";
import { addMinutes } from "date-fns";
import { sendEmailWithPassWord } from "@/utils/email-otp.utils";
import crypto from "crypto";
import { hashPassword } from "@/utils/bcrypt.utils";

export class PasswordResetService {
  public async sendResetLink(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Segurança: não revela se o usuário existe
    if (!user) return;

    // Invalida OTPs antigos
    await prisma.otp.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    // Gera token seguro
    const token = crypto.randomBytes(32).toString("hex");

    // Salva no mesmo modelo Otp
    await prisma.otp.create({
      data: {
        code: token,
        userId: user.id,
        expiresAt: addMinutes(new Date(), 60), // link válido por 1h
      },
    });

    // Link de reset apontando para backend para testes// Gera link totalmente backend usando .env
    const resetLink = process.env.PASSWORD_RESET_URL!.replace("{TOKEN}", token);

    // Envia e-mail
    await sendEmailWithPassWord(email, resetLink);

    console.log("Link de reset enviado para:", email);
    console.log("Link para teste:", resetLink); // imprime no console para você testar direto
  }

  public async completeReset(token: string, newPassword: string) {
    const otp = await prisma.otp.findFirst({
      where: { code: token, used: false },
      include: { user: true },
    });

    if (!otp) throw new Error("Token inválido ou já usado");
    if (otp.expiresAt < new Date()) throw new Error("Token expirado");

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: otp.userId },
      data: { senha: hashedPassword },
    });

    await prisma.otp.update({
      where: { id: otp.id },
      data: { used: true },
    });

    return { message: "Senha redefinida com sucesso!" };
  }
}
