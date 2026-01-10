import { Request, Response } from "express";
import { VerifyOtpService } from "../services/otp/verify-otp.service";

export async function verifyOtpController(req: Request, res: Response) {
    try {
        const service = new VerifyOtpService();
        const result = await service.execute(req.body);

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
