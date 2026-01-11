import { prisma } from "@/lib/prisma";
import { generateAccessToken, verifyRefreshToken } from "@/utils/jwt.utils";

export class RefreshTokenService {
  async execute(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);

    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session) {
      throw new Error("INVALID_REFRESH_TOKEN");
    }

    if (session.expiresAt < new Date()) {
      throw new Error("REFRESH_TOKEN_EXPIRED");
    }

    const newAccessToken = generateAccessToken({
      userId: session.user.id,
      email: session.user.email,
    });

    return {
      accessToken: newAccessToken,
    };
  }
}
