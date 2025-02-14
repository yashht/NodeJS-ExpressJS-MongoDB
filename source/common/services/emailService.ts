import { Client } from "@sendgrid/client";
import sgMail from "@sendgrid/mail";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import config from "../config/config";

let BASE_PATH: Array<string>;
BASE_PATH = __dirname.split('/');
BASE_PATH.splice(-1, 1);
let PATH = BASE_PATH.join('/');

const apiKey = config.sendgrid.api_key
const sender = config.sendgrid.email_from

// It sets the client for sending email using sendgrid.
sgMail.setClient(new Client());

// It sets the API key for sendgrid mailer.
sgMail.setApiKey(apiKey);

// Sets the sub stitution wrapper for sendgrid mailer.
sgMail.setSubstitutionWrappers("{{", "}}")

// Sends an email using the SendGrid API.
function sendEmail(params: any) {
    sgMail.send({
        from: { name: "CLUBCOMS", email: sender },
        to: params.to,
        subject: params.subject,
        html: params.html
    }).then(() => {
        console.log("Sent Mail")
    })
        .catch((error) => {
        })
}

// Sends an OTP login email to the given email address.
function sendOtpLogin(email: string, subject: string, OTP: number) {
    let html = fs.readFileSync(path.join(PATH, "/public/templates/loginOtp.html"), { encoding: "utf-8" });
    const template = handlebars.compile(html);
    const htmlToSend = template({
        subject: subject,
        otp: OTP,
        otp_expires: config.otp_expires_in_minutes
    })
    sendEmail({ to: email, html: htmlToSend, subject: subject })
};
// Sends an OTP login email to the given email address.
function sendOtpForgot(email: string, subject: string, OTP: number) {
    let html = fs.readFileSync(path.join(PATH, "/public/templates/forgotOtp.html"), { encoding: "utf-8" });
    const template = handlebars.compile(html);
    const htmlToSend = template({
        subject: subject,
        otp: OTP,
        otp_expires: config.otp_expires_in_minutes
    })
    sendEmail({ to: email, html: htmlToSend, subject: subject })
};


function sendOnboardingEmail(email: string, subject: string, name: string) {
    let html = fs.readFileSync(path.join(PATH, "/public/templates/onboarding.html"), { encoding: "utf-8" });
    const template = handlebars.compile(html);
    const htmlToSend = template({
        subject: subject,
        name: name
    })
    sendEmail({ to: email, html: htmlToSend, subject: subject })
}

function sendEmailToAdmin(adminEmail: string, subject: string, message: string, userName: string, userEmail: string) {
    let html = fs.readFileSync(path.join(PATH, "/public/templates/adminEmail.html"), { encoding: "utf-8" });
    const template = handlebars.compile(html);
    const htmlToSend = template({
        name: userName,
        message: message,
        email: userEmail
    })
    sendEmail({ to: adminEmail, html: htmlToSend, subject: subject })
}

export default {
    sendOtpLogin,
    sendOtpForgot,
    sendOnboardingEmail,
    sendEmailToAdmin
}