import { error } from "console";
import { Request, Response } from "express";
import { createAndSendOTP } from "../services/email-otp.service";

export async function EmailOtpService(req:Request, res:Response):Promise<void> {
    const {email} = req.body;
    if(!email){
        res.status(400).json({message:"E-mail inválido ou não enviado na requisição."});
        return;
    }
    try{
        await createAndSendOTP(email);
        res.status(200).json({message:"OTP enviado para o e-mail infromado."});
    } catch (errro){
        console.log('Error ao enviar e-mail')
        res.status(500).json({message:"Falha ao enviar OTP."})
        }
}