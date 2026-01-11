import { prisma } from "@/lib/prisma";

export class MeService {
    async execute(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                nome: true,
                email: true,
                avatar: true,
            },
        });

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        return user;
    }
}
