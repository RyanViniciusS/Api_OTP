import { sendEmailWithOtp } from "../utils/email-otp.utils";
import { generateOTP } from "../utils/otp-generator.utils";

export async function createAndSendOTP(email: string) {
    const otp = generateOTP();
    //console.log(otp);
    await sendEmailWithOtp(email, otp);
}