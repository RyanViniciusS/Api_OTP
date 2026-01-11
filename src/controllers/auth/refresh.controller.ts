import { Request, Response } from "express";
import { RefreshTokenService } from "@/services/auth/refresh.service";

const service = new RefreshTokenService();

export async function refreshController(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { refreshToken } = req.body;

        const result = await service.execute(refreshToken);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch {
        res.status(401).json({
            message: "Refresh token inválido",
        });
    }
}
