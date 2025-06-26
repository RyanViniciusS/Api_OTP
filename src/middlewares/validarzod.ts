// middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = schema.parse(req.body); // valida e já "tipa" o req.body
    next();
  } catch (error: any) {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: error.errors,
    });
  }
};
