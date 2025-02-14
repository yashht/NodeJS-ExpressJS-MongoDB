import dotenv from 'dotenv';
import path from 'path';
import Joi, {ObjectSchema} from '@hapi/joi';
import { environmentVariables } from '../utils/typeAliases';

/**
 * Loads environment variables from a .env file located at the specified path.
 * path: The path to the .env file.
 */

dotenv.config({ path: path.join(__dirname, '../../../.env') });

/**
 * Defines a schema for environment variables using the Joi library.
 * It returns an Object of Joi schema object that can be used to validate environment variables.
 * envVarsSchema must be of type interface environmentVariables.
 */

const envVarsSchema : ObjectSchema<environmentVariables> =  Joi.object()
   // Defines a Joi schema for validating environment variables.
  .keys({
    NODE_ENV: Joi.string()
      .valid('staging', 'live')
      .required(),

    PORT: Joi.number().default(3000),

    MONGODB_URL: Joi.string()
      .required()
      .description('MongoDB URL'),

    EMAIL_FROM: Joi.string().
      required()
      .description('Refers to the email of the sender'),

    SENDGRID_API_KEY: Joi.string()
      .required()
      .description('Send grid key which is used to send the emails'),

    SENDBIRD_APP_ID: Joi.string()
    .required()
    .description('Refers to the ID of sendbird application'),

    SENDBIRD_API_TOKEN: Joi.string()
    .required()
    .description('API token of Sendbird application'),

    IMAGE_BASE_URL: Joi.string()
    .required()
    .description('Base URL of the images that are stored in AWS S3 bucket'),

    TWILIO_NUMBER: Joi.string()
    .required()
    .description('Refers to the number of sender'),

    TWILIO_ACCOUNT_SID : Joi.string()
    .required()
    .description('Refers to Twilio account SID'),

    TWILIO_AUTH_TOKEN: Joi.string()
    .required()
    .description('Refers to the auth token of twilio account'),

    OTP_EXIPRES_IN_MINUTES: Joi.string()
    .required()
    .description('Refers to the expiry time of OTP in minutes'),

    VIRGIL_APP_ID: Joi.string()
    .required()
    .description('Refers to the ID of Virgil application'),

    VIRGIL_APP_KEY_ID: Joi.string()
    .required()
    .description('Refers to the key ID of Virgil application'),

    VIRGIL_APP_KEY: Joi.string()
    .required()
    .description('Refers to the key of Virgil application'),

    JWT_SECRET: Joi.string()
    .required()
    .description('Refers to the secret key of JWT'),

    ADMIN_EMAIL: Joi.string()
    .required()
    .description('Refers to the admin email'),
  })
  .unknown();


/**
 * Validates the environment variables against the preferences schema and returns the result.
 * process.env : The environment variables object.
 * It returns an object containing the validated environment variables and any errors.
 */

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

/**
 * If an error is thrown during config validation, log the error to the console and throw a new error with a message that includes the error message.
 * error: the error object thrown during config validation
*/

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


// An object containing various configuration options for the application.
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  },
  sendgrid: {
    email_from: envVars.EMAIL_FROM,
    api_key: envVars.SENDGRID_API_KEY,
  },
  sendbird: {
    app_id: envVars.SENDBIRD_APP_ID,
    api_token: envVars.SENDBIRD_API_TOKEN
  },
  twilio: {
    number: envVars.TWILIO_NUMBER,
    account_sid: envVars.TWILIO_ACCOUNT_SID,
    auth_token: envVars.TWILIO_AUTH_TOKEN
  },
  virgil: {
    app_id: envVars.VIRGIL_APP_ID,
    app_key_id: envVars.VIRGIL_APP_KEY_ID,
    app_key: envVars.VIRGIL_APP_KEY
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
  otp_expires_in_minutes: envVars.OTP_EXIPRES_IN_MINUTES,
  image_base_url: envVars.IMAGE_BASE_URL,
  adminEmail: envVars.ADMIN_EMAIL
};
