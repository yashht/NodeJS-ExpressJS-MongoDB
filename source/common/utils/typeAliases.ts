import Joi, { string } from '@hapi/joi';
import { Request } from 'express';

export interface queryOptions {
    page?: number;
    limit?: number;
    skip?: number;
    sortBy?: string
}
export interface returnQueryOptions {
    page: number;
    limit: number;
    skip: number;
    sort: string | object
}
export interface apiResponse {
    messsge: string;
    data?: Array<object> | object
}
export interface appError {
    status: number;
    isOperational?: boolean;
    message: string;
    stack?: string;
}
export interface otpData {
    OTP: number;
    OTPExpiresAt: Date;
}


export interface transferDeviceOtpData extends Omit<otpData, 'mobileOTP'> {

}

export interface requestSchema {
    params?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    body?: Joi.ObjectSchema;
}
export interface environmentVariables {
    NODE_ENV: 'staging' | 'live';
    PORT: number;
    MONGODB_URL: string;
    EMAIL_FROM: string,
    SENDGRID_API_KEY: string,
    SENDBIRD_APP_ID: string,
    SENDBIRD_API_TOKEN: string,
    IMAGE_BASE_URL: string,
    TWILIO_NUMBER: string,
    TWILIO_ACCOUNT_SID: string,
    TWILIO_AUTH_TOKEN: string,
    OTP_EXPIRES_IN_MINUTES: string,
    ADMIN_EMAIL: string
}
export interface loginData {
    userId: string,
    email: string,
    phoneNumber: string,
    isEmailVerified: boolean,
    isMobileVerified: boolean,
    isOnboarded: boolean,
    deviceToken: string,
    showOnline: boolean,
    showLastSeen: boolean,
    showTimeZone: boolean,
    status: string,
    isNewDevice?: boolean,
    isNewUser?: boolean,
    firstName: string,
    surname: string,
    accountType: string,
    profilePicture: string,
}
export interface authData {
    userId: string,
    password: string,
    name: string

}

export interface customRequest extends Request {
    user?: loginData;
    admin?: adminLoginData;
    virgilUser?: any;
}

export interface onboardingData {
    firstName: string,
    surname: string,
    isOnboarded: boolean,
    accountType: string,
}
export interface appointmentData {
    companyId: string | null,
    companyName: string,
    toBeAdded: boolean,
    jobTitleId: string,
    startMonth: string,
    endMonth: string,
    startYear: number,
    endYear: number | null,
    locationId: string,
    locationName: string,
    roleDescription: string,
    isCurrent: boolean
}
export interface companyDetailsToAdd {
    companyName: string,
    createdBy: string,
    ownedBy?: string,
}
export interface companyOnboardingResponse {
    companyId: string,
    companyName: string,
    accountType: string,
    isOnboarded: boolean
}
export interface newLoginData {
    userId: string,
    email: string,
    phoneNumber: string,
    isMobileVerified: boolean,
    isEmailVerified: boolean,
    isOnboarded: boolean,
    deviceId: string,
    deviceToken: string
    showOnline: boolean,
    showLastSeen: boolean,
    showTimeZone: boolean,
    status: string,
    isNewDevice?: boolean,
    isNewUser?: boolean,
    firstName: string,
    surname: string,
    accountType: string,
    profilePicture: string,
    companyId: string,
    companyName?: string,
    timezone?: string
}

export interface adminLoginData {
    userId: string,
    email: string,
    status: string,
    name?: string,
}

export interface matchingData {
    firstName: string,
    surname: string,
    profilePicture: string,
    userId: string,
    jobTitle: string,
    companyName: string,
    sectorName: string
}
export interface notificationRecipient {
    _id: string,
    deviceToken: string,
    firstName: string,
    surname: string
}