import { Request, Response } from "express";
import { verifyOtpSchema } from "../../schemas/emailopt.schema";
import { VerifyOtpService } from "../../services/otp/verify-otp.service";

export async function VerifyOtpController(
    req: Request,
    res: Response
): Promise<void> {
    const service = new VerifyOtpService();

    try {
        const dados = verifyOtpSchema.parse(req.body);

        await service.verifyOtp({
            email: dados.email,
            otp: dados.otp,
        });

        res.status(200).json({
            success: true,
            message: "Conta verificada com sucesso",
        });

    } catch (error: any) {
        if (error.message === "USER_NOT_FOUND") {
            res.status(404).json({
                success: false,
                message: "Usuário não encontrado",
            });
        }

        if (error.message === "OTP_INVALID") {
            res.status(400).json({
                success: false,
                message: "OTP inválido ou expirado",
            });
        }

        // erro inesperado → log completo
        console.error("VERIFY OTP ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
        });
    }
}
