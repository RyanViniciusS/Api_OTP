import { LoginInput } from "@/schemas/auth/auth.schema";
import { AuthService } from "@/services/auth/login.service";
import { log } from "@/utils/logger";
import { Request, Response } from "express";

const service = new AuthService();
export async function LoginController(req: Request<{}, {}, LoginInput>, res: Response): Promise<void> {
    try {
        const result = await service.login({
            email: req.body.email,
            senha: req.body.senha,
            userAgent: req.headers["user-agent"],
            ip: req.ip,
        })
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        log.warn("Falha no login", {
            email: req.body.email,
            ip: req.ip,
        })
        res.status(401).json({
            message: "Credenciais inválidas",
        });;
    }
}

