import { Response } from 'express';
import createResponse from '../../common/utils/response';
import companyServices from './authServices';
import httpStatus from 'http-status';
import { customRequest } from '../../common/utils/typeAliases';
import userServices from '../user/userServices';
import constant from '../../common/config/constant';
import emailService from '../../common/services/emailService';
import sectorModel from '../../model/sectorModel';
import mongoose from 'mongoose';
import authServices from './authServices';
import tokenServices from '../../services/tokenServices';
import bcrypt from 'bcryptjs';


const userLogin = async (req: customRequest, res: Response) => {
    try {
        const userDetails = await authServices.userLogin(req.body.email, req.body.password);

        if (userDetails.length === 0) {
            createResponse(res, httpStatus.BAD_REQUEST, (req as any).t('successMessages.authLoginWrong'), {});
        }
        else {
            const generateTokens = await tokenServices.generateAuthTokensAdmin(req, userDetails[0]._id);
            let newObj = {
                _id: userDetails[0]._id,
                email: userDetails[0].email,
                name: userDetails[0].name,
                accessToken: generateTokens.accessToken,
                refreshToken: generateTokens.refreshToken,
            }
            createResponse(res, httpStatus.OK, (req as any).t('successMessages.authLoginSuccess'), newObj);
        }
    }
    catch (error: any) {
        console.log(error, 'errrrr')
        let errorCode = error?.status ? error.status : 500
        createResponse(res, errorCode, error.message);
    }
}

const forgotPassword = async (req: customRequest, res: Response) => {
    try {
        const userDetails = await authServices.forgotPassword(req.body.email);
        if (userDetails.length === 0) {
            createResponse(res, httpStatus.NOT_FOUND, (req as any).t('successMessages.forgotWrong'), {});
        } else {
            const resendEmailOTP = await userServices.resendEmailOTPWeb();
            await emailService.sendOtpForgot(userDetails[0].email, (req as any).t('utilityTexts.signupEmailSubject'), resendEmailOTP.OTP);

            let response = {
                "OTP": resendEmailOTP.OTP,
                "OTPExpiresIn": 600
            }
            createResponse(res, httpStatus.OK, (req as any).t('successMessages.forgotSuccess'), response);
        }
    }
    catch (error: any) {
        console.log(error, 'errrrr')
        let errorCode = error?.status ? error.status : 500
        createResponse(res, errorCode, error.message);
    }
}



const resendOTP = async (req: customRequest, res: Response) => {
    try {
        const userDetails = await authServices.resendOTP(req.body.email);
        if (userDetails.length === 0) {
            createResponse(res, httpStatus.NOT_FOUND, (req as any).t('successMessages.forgotWrong'), {});
        } else {
            const resendEmailOTP = await userServices.resendEmailOTPWeb();
            await emailService.sendOtpForgot(userDetails[0].email, (req as any).t('utilityTexts.signupEmailSubject'), resendEmailOTP.OTP);

            let response = {
                "OTP": resendEmailOTP.OTP,
                "OTPExpiresIn": 600
            }
            createResponse(res, httpStatus.OK, (req as any).t('successMessages.resendSuccess'), response);
        }
    }
    catch (error: any) {
        console.log(error, 'errrrr')
        let errorCode = error?.status ? error.status : 500
        createResponse(res, errorCode, error.message);
    }
}

const resetPassword = async (req: customRequest, res: Response) => {
    try {
        if (req.body.confirmPassword !== req.body.password) {
            return createResponse(
                res,
                httpStatus.CONFLICT,
                (req as any).t('successMessages.confirmnotmatch'),
                {}
            );
        }

        let encPassword = await bcrypt.hash(req.body.password, 8);
        let userDetails: any = await authServices.resetPassword(req.body.email, encPassword);

        if (!userDetails || userDetails.length === 0) {
            return createResponse(
                res,
                httpStatus.NOT_FOUND,
                (req as any).t('successMessages.forgotWrong'),
                userDetails
            );
        }

        return createResponse(
            res,
            httpStatus.OK,
            (req as any).t('successMessages.resetSuccess'),
            userDetails
        );
    } catch (error: any) {
        console.error(error, 'errrrr');
        const errorCode = error?.status || 500;
        return createResponse(res, errorCode, error.message);
    }
};


export default {
    userLogin,
    forgotPassword,
    resetPassword,
    resendOTP
}
