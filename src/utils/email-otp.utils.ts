import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!); // chave em .env ou Vercel

export async function sendEmailWithOtp(to: string, otp: string) {
  const subject = "🔐 Verificação de segurança";

  const html = `
    <div style="background-color: #f9f9f9; padding: 40px 20px; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); margin: auto; overflow: hidden;">
      
        <div style="background-color: #2ecc71; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0;">Ryan</h1>
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
          © ${new Date().getFullYear()} Ryan. Todos os direitos reservados.
        </div>
      </div>
    </div>
  `;

  // Enviar e-mail real via Resend
  const result = await resend.emails.send({
    from: "from@resend.dev",
    to,
    subject,
    html,
  });

  //console.log("Email enviado para:", to, "ID:", result.id);
}
