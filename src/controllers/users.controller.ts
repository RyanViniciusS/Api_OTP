import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";
import { createUserService } from "../services/user.service";

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const service = new createUserService();
  try {
    const userData: CreateUserInput = req.body;

    const createUserService = await service.createUser(userData);
    res.status(201).json({ message: "user criado", data: createUserService });
  }
  catch (error: any) {
    console.log(error);
    if (error.message === "E-mail já registrado") {
      res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}


