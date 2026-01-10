import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";
import { CreateUserResponse } from "../types/user.types";
import { createUserService } from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  const service = new createUserService();
  try {
    const userData: CreateUserInput = req.body;

    const createUserService = await service.createUser(userData);
    res.status(201).json({ message: "user criado", data: createUserService });
  }
  catch (error: any) {
    if (error.message === "E-mail já registrado") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}


