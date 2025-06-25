import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// 1) Primeiro, defina um objeto tipado como SMTPTransport.Options
const smtpOptions: SMTPTransport.Options = {
  host: 'localhost',
  port: 1025,
  secure: false,
  //auth: null,
};

// 2) Use essa variável no createTransport
const transporter = nodemailer.createTransport(smtpOptions);

// (Produção, apenas descomente e comente o bloco acima)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_GMAIL,
//     pass: process.env.SENHA_GMAIL,
//   },
// });

export async function sendEmailWithOtp(to: string, otp: string) {
  const subject = '🔐 Verificação de segurança';

    const html = `
    <div style="background-color: #f9f9f9; padding: 40px 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); margin: auto; overflow: hidden;">
        
        <div style="background-color: #2ecc71; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">COMAL</h1>
            <p style="color: #d5f5e3; margin: 8px 0 0;">Verificação de segurança</p>
        </div>

        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2c3e50;">Olá,</p>
            <p style="font-size: 16px; color: #2c3e50;">
            Use o código abaixo para confirmar seu e-mail. Este código é válido por <strong>10 minutos</strong>.
            </p>

            <div style="margin: 30px auto; text-align: center;">
            <div style="display: inline-block; padding: 16px 32px; background-color: #e8f8f5; color: #27ae60; font-size: 28px; font-weight: bold; border-radius: 8px;">
                ${otp}
            </div>
            </div>

            <p style="font-size: 14px; color: #7f8c8d;">
            Se você não solicitou este código, apenas ignore este e-mail.
            </p>
        </div>

        <div style="background-color: #ecf0f1; padding: 12px; text-align: center; font-size: 12px; color: #7f8c8d;">
            © ${new Date().getFullYear()} COMAL. Todos os direitos reservados.
        </div>
        </div>
    </div>
    `;


  const mailOptions = {
    from: `"COMAL" <${process.env.EMAIL_GMAIL}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}
