import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate = (schema: ZodSchema<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.parse(req.body);
      req.body = result;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          if (!formattedErrors[field]) {
            formattedErrors[field] = err.message;
          }
        });

        res.status(400).json({
          message: "Erro de validação",
          errors: formattedErrors,
        });
        return;
      }

      res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  };
};
