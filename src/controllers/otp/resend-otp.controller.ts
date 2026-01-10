import { Request, Response } from "express";
import { ResendOtpService } from "../../services/otp/resend-otp.service";

export async function ResendOtpController(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const service = new ResendOtpService();

    await service.execute(email);

    res.status(200).json({
        success: true,
        message: "Se o e-mail estiver cadastrado, um novo código foi enviado.",
    });
}
