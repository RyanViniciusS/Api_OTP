import { prisma } from "../lib/prisma";
import { CreateUserInput } from "../schemas/user.schema";
import { hashPassword } from "../utils/bcrypt.utils";
import { sendEmailWithOtp } from "../utils/email-otp.utils";
import { generateOTP } from "../utils/otp-generator.utils";

export class createUserService {
    public async createUser(props: CreateUserInput) {
        const userCriado = await prisma.user.findUnique({
            where: { email: props.email },
        });

        if (userCriado) {
            throw new Error("E-mail já registrado"); // Lançando erro
        }
        const senhaCriptografada = await hashPassword(props.senha);

        const user = await prisma.user.create({
            data: {
                nome: props.nome,
                email: props.email,
                senha: senhaCriptografada,
                avatar: props.avatar,
            },
        });

        const otpCode = generateOTP(6);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await prisma.otp.create({
            data: {
                code: otpCode,
                expiresAt,
                userId: user.id,
            },
        });

        await sendEmailWithOtp(user.email, otpCode);
        return {
            nome: user.nome,
            email: user.email,
            avatar: user.avatar,
        };
    }

}
