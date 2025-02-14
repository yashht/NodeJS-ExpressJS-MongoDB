import { Twilio } from 'twilio';
import config from '../config/config'

// The Twilio phone number and authentication credentials.
const twilioNumber = config.twilio.number;
const accountSid = config.twilio.account_sid;
const authToken = config.twilio.auth_token;

const client = new Twilio(accountSid, authToken);

// Sends an SMS using the Twilio API.
const sendSms = async (body: any, toNo: any) => {
    /**
     * Sends a text message using the Twilio API.
     *  body - The body of the text message.
     *  toNo - The phone number to send the text message to.
     *  twilioNumber - The Twilio phone number to send the text message from.

     */
    await client.messages
        .create({
            body: body,
            to: toNo,
            from: twilioNumber
        })
        .then((message: any) => {
            console.log("Message sent")
        }).catch((error: any) => {
            console.log("twilio err:", error)
        });
};

export default {
    sendSms 
}