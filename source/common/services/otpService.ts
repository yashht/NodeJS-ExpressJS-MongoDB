import moment from "moment";
import { otpData } from "../utils/typeAliases";
import config from '../config/config';

// This function is used to generate OTP for login
// const generateOtp = () : otpData => {
//     // Generating OTPs of 3 digits
//     // const emailValue = Math.floor(100 + Math.random() * 900);
//     // const mobileValue = Math.floor(100 + Math.random() * 900);

//     const emailValue = 111;
//     const mobileValue = 111;

//     // Setting OTP expiration time to 10 mins 
//     const OTPExpiresAt = moment().add(config.otp_expires_in_minutes, 'minutes').toDate();

//     // Returning the OTP Data that includes OTP for email, OTP foe Mobile and their expiry time
//     let otpData = { emailOTP: emailValue, mobileOTP: mobileValue, OTPExpiresAt: OTPExpiresAt};
//     return otpData
// }


// This function is used to generate OTP to be sent on Email
const generateOtp = (): otpData => {
    // Generating OTP of 6 digits
    // const OTP = Math.floor(100000 + Math.random() * 900000);
    const OTP = 111111;

    // Setting OTP expiration time to 10 mins
    const OTPExpiresAt = moment().add(config.otp_expires_in_minutes, 'minutes').toDate();

    // Returning the OTP Data that includes OTP and its expiry time
    let otpData = { OTP: OTP, OTPExpiresAt: OTPExpiresAt };
    return otpData
}

const generateOtpWeb = (): otpData => {
    // Generating OTP of 6 digits
    const OTP = Math.floor(100000 + Math.random() * 900000);
    // const OTP = 111111;

    // Setting OTP expiration time to 10 mins
    const OTPExpiresAt = moment().add(config.otp_expires_in_minutes, 'minutes').toDate();

    // Returning the OTP Data that includes OTP and its expiry time
    let otpData = { OTP: OTP, OTPExpiresAt: OTPExpiresAt };
    return otpData
}
// This function is used to generate OTP for the functionality of transfer device
const generateTransferDeviceOTP = () => {

    // Generating OTP of 3 digits
    const emailValue = Math.floor(100000 + Math.random() * 900000);

    // Setting OTP expiration time to 10 mins
    const OTPExpiresAt = moment().add(config.otp_expires_in_minutes, 'minutes').toDate();

    // Returning the OTP Data that includes OTP and its expiry time
    let otpData = { emailOTP: emailValue, OTPExpiresAt: OTPExpiresAt };
    return otpData
}

export default {
    generateOtp,
    generateOtpWeb,
    generateTransferDeviceOTP
}

