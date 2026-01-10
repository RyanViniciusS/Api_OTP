import { z } from "zod";

export const createUserSchema = z.object({
  nome: z.string({ required_error: "o campo nome é obrigatório" }).min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string().nonempty("Email é obrigatório").email("Email inválido"),
  senha: z.string().nonempty("Senha é obrigatória").min(6, "Senha deve ter ao menos 6 caracteres"),
  avatar: z.string().optional().nullable(),
});

// Exporta o tipo TypeScript gerado automaticamente pelo Zod
export type CreateUserInput = z.infer<typeof createUserSchema>;
