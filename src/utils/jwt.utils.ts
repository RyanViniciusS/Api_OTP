import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

interface GenerateJwtPayload {
  userId: string;
  email: string;
}

const JWT_EXPIRES_IN = "15m";

export function generateAccessToken(payload: GenerateJwtPayload) {
  return jwt.sign(
    {
      sub: payload.userId,
      email: payload.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
}


export function generateRefreshToken(userId: string) {
  return jwt.sign(
    {},
    REFRESH_TOKEN_SECRET,
    {
      subject: userId,
      expiresIn: "7d",
    }
  );
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
}