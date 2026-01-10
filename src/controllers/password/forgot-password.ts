import { Request, Response } from "express";
import { PasswordResetService } from "@/services/password/forgot-password.service";
const service = new PasswordResetService();

export async function passwordResetRoutes(req: Request, res: Response): Promise<void> {
    try {
        const { email } = req.body;

        await service.sendResetLink(email);

        res.status(200).json({
            message: "Se este e-mail estiver registrado, você receberá um link para redefinir a senha.",
        });

    } catch (error) {
        console.error("Erro ao enviar link de reset:", error);
        res.status(500).json({ message: "Erro interno ao processar a requisição." });
    }
}


export async function completePasswordReset(req: Request, res: Response): Promise<void> {
    try {
        const { token } = req.query as { token: string };
        const { newPassword } = req.body;

        if (!token || !newPassword) {
            res.status(400).json({ message: "Token e nova senha são obrigatórios." });
        }

        const result = await service.completeReset(token, newPassword);

        res.status(200).json(result);

    } catch (error: any) {
        console.error("Erro ao redefinir senha:", error);
        res.status(400).json({ message: error.message || "Erro interno." });
    }
}