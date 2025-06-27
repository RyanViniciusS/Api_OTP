import crypto from 'crypto';

export async function requestPasswordResetService(email: string): Promise<boolean> {
    const token = crypto.randomBytes(32).toString('hex')
    const url = `http://localhost:7001/reset-password?token=${token}`
    console.log(url)
    return true
}


