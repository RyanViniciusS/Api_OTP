import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/jwt.utils";

export interface AuthRequest extends Request {
  userId?: string;
}

export function authGuard(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Não autenticado" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
}
