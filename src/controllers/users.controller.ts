import { Request, Response } from "express";

export const users_Controler = async (req: Request, res: Response): Promise<void> => {
  const {name, email } = req.body;
  
  if(!name || !email){
     res.send({message:"Está faltando algum dados"}).status(400)
     return
  }
};
