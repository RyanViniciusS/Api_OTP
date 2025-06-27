import { promises } from "dns";
import { Request, Response } from "express";
import { z } from "zod";
import { requestPasswordResetService } from "../services/email-password.service";

const requestResetSchema = z.object({
    email: z.string().email('E-mail inválido')
})
export async function requestPasswordResetController(req: Request, res: Response): Promise<void> {
    const dados = requestResetSchema.parse(req.body)
    try {
        const validarService = await requestPasswordResetService(dados.email)
        if (!validarService) {
            res.status(400).json({ message: "Email inválido" });
            return;
        }
        res.status(200).json({ message: "Link de recuperação enviado para o e-mail." })
    } catch (error) {
        res.status(500).json({ message: "Error intenro no servidor" })
    }

}