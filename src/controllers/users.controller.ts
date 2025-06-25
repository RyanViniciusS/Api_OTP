import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, senha, avatar } = req.body; // já validado pelo middleware

  // Aqui você pode chamar o service, salvar no banco etc.
  res.status(201).json({
    message: "Usuário criado com sucesso",
    data: { name, email, avatar },
  });
};
