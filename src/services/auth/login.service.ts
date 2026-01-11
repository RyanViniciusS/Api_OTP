import { prisma } from "@/lib/prisma";
import { LoginInput } from "@/schemas/auth/auth.schema";
import { compareHash } from "@/utils/bcrypt.utils";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt.utils";

interface LoginDTO {
    email: string;
    senha: string;
    userAgent?: string;
    ip?: string;
}


export class AuthService {
    public async login(props: LoginDTO) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: props.email,
                },
            });

            if (!user) {
                throw new Error("Credenciais inválidas");
            }

            const senhaValida = await compareHash(
                props.senha,
                user.senha
            );

            if (!senhaValida) {
                throw new Error("Credenciais inválidas");
            }

            const accessToken = generateAccessToken({
                userId: user.id,
                email: user.email,
            });
            const refreshToken = generateRefreshToken(user.id);

            await prisma.session.create({
                data: {
                    refreshToken,
                    userId: user.id,
                    userAgent: props.userAgent,
                    ip: props.ip,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            })

            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    }
}