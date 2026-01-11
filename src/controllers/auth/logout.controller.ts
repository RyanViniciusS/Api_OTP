import { Request, Response } from "express";
import { LogoutService } from "@/services/auth/logout.service";

const service = new LogoutService();

export async function LogoutController(req: Request, res: Response): Promise<void> {
  const refreshToken = req.cookies?.refreshToken;

  await service.execute(refreshToken);

  res.clearCookie("refreshToken", {
    path: "/auth/refresh",
  });

  res.status(204).send();
}
