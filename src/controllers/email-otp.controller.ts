import { Request, Response } from "express";
import { createOtpService, valideOtpService } from "../services/email-otp.service";
import { otpschema } from "../schemas/emailopt.schema";


export async function EmailOtpController(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "E-mail inválido ou não enviado na requisição." });
        return;
    }
    try {
        await createOtpService(email);
        res.status(200).json({ message: "OTP enviado para o e-mail infromado." });
    } catch (errro) {
        console.log('Error ao enviar e-mail')
        res.status(500).json({ message: "Falha ao enviar OTP." })
    }
}

export async function VerifyOtpController(req: Request, res: Response): Promise<void> {
    const dados = otpschema.parse(req.body)
    try {
        const validar = await valideOtpService(dados.email, dados.otp)
        if (!validar) {
            res.status(400).json({ message: "OTP inválido ou expirado." })
        }
        //se for true
        res.status(200).json({ message: "OTP validado com sucesso!" })

    } catch (error) {
        res.status(500).json({ message: "Error interno no servidor." })
    }

}
