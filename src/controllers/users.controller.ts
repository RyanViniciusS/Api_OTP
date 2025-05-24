import { Request, Response } from "express";
import { createUserSchema, CreateUserInput } from "../schemas/schemas";

export const createUser = async (req: Request<unknown, unknown, CreateUserInput>, res: Response): Promise<void> => {
  try {
    const dadosValidos = createUserSchema.parse(req.body)
    console.log(dadosValidos)
    const { name, email, senha, avatar } = dadosValidos;

  }
  catch {

  }

}

