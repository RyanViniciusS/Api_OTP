import { z } from 'zod';

export const otpschema = z.object({
    email: z.string().email('E-mail inválido'),
    otp: z.string().regex(/^\d{6}$/, "OTP deve ter 6 dígitos numéricos")
})