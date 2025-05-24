import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
  avatar: z.string().optional().nullable(),
});

// Exporta o tipo TypeScript gerado automaticamente pelo Zod
export type CreateUserInput = z.infer<typeof createUserSchema>;
