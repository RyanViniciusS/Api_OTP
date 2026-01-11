import { Response } from "express";
import { AuthRequest } from "@/middlewares/auth.jwt";
import { MeService } from "@/services/auth/me.service";

const service = new MeService();

export async function meController(
    req: AuthRequest,
    res: Response
): Promise<void> {
    try {
        const user = await service.execute(req.userId!);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch {
        res.status(401).json({
            message: "Usuário não autenticado",
        });
    }
}
