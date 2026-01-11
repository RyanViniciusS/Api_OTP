import { prisma } from "@/lib/prisma";

export class LogoutService {
    async execute(refreshToken: string) {
        if (!refreshToken) return;

        await prisma.session.deleteMany({
            where: {
                refreshToken,
            },
        });
    }
}
