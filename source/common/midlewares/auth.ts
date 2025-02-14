/* This file exports a custom middleware function named auth.
This middleware fuction is intended to perform following operations.
1. This middleware function checks whether the user exists or not in the database.
- If user doesn't exist, it gives error of 404: User not found.
- If user is there but in the inactive state, it gives error of 403: You can not perform this action. This user is in an Inactive state.
2. It also checks that user has not transferred its account to the different device. If user has done that, It will give an error of 401: Your session has expired.
3. It also appends the user info the in the user field of 'req' which is of type interface customRequest. 
*/

import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import createResponse from './../utils/response';
import userModel from '../../model/userModel';
import adminModel from '../../model/adminModel';
import { customRequest, newLoginData, adminLoginData } from '../utils/typeAliases';
import constant from '../config/constant';
import appError from '../utils/appError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

// Here the parameter 'req' is of type interface customRequest which extends the class Request of express.
const auth = () => async (req: customRequest, res: Response, next: NextFunction) => {
    try {
        /* Reading deviceToken and userId from headers of request
        It also annotate type string to both of them. 
        */
        const token = req.header('Authorization') as string;
        const userId = req.header('userId') as string;

        /*
        This block is executed if any of deviceToken and userId is not provided or is undefined.
        It also gives an error of 401 if any of deviceToken and userId is undefined.
        */
        if (!token || !userId) {
            throw new appError(httpStatus.UNAUTHORIZED, (req as any).t('errorMessages.needAuthentication'));
        }

        // This block is executed if deviceToken and userId both are provided.
        else if (token && userId) {
            const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
            const payload: any = decoded.sub;

            let userData = await userModel.findById(userId);
            if (userData != null) {
                // if(userData.email !== payload?.email || userData.phoneNumber !== payload?.phoneNumber){
                //     throw new appError(httpStatus.UNAUTHORIZED, (req as any).t('errorMessages.invalidToken'));
                // }
                if (userData.status === constant.STATUS.INACTIVE) {
                    throw new appError(httpStatus.FORBIDDEN, (req as any).t('errorMessages.inactiveUser'));
                }
                if (userData.status === constant.STATUS.DELETED) {
                    throw new appError(httpStatus.FORBIDDEN, (req as any).t('errorMessages.deletedUser'));
                }
                else if (userData.deviceId === payload?.deviceId) {
                    let userInfo: newLoginData = {
                        userId: userData._id.toString(),
                        email: userData.email,
                        phoneNumber: userData.phoneNumber,
                        isEmailVerified: userData.isEmailVerified,
                        isMobileVerified: userData.isMobileVerified,
                        isOnboarded: userData.isOnboarded,
                        deviceToken: userData.deviceToken,
                        deviceId: userData.deviceId,
                        showOnline: userData.showOnline,
                        showLastSeen: userData.showLastSeen,
                        showTimeZone: userData.showTimeZone,
                        status: userData.status,
                        firstName: userData.firstName,
                        surname: userData.surname,
                        accountType: userData.accountType || '',
                        profilePicture: userData.profilePicture,
                        companyId: userData.companyId?.toString() || '',
                    }
                    req.user = userInfo;
                    next();
                }
                else if (userData.deviceId !== payload?.deviceId) {
                    throw new appError(httpStatus.FORBIDDEN, (req as any).t('errorMessages.unAuthorized'));
                }
            }
            else if (userData === null) {
                let adminData: any = await adminModel.findById(userId);
                let userInfo: adminLoginData = {
                    userId: adminData._id.toString(),
                    email: adminData.email,
                    name: adminData.name,
                    status: adminData.status,

                }
                req.admin = userInfo;
                next();
                if (adminData === null) {
                    throw new appError(httpStatus.NOT_FOUND, (req as any).t('errorMessages.userNotFound'));

                }

            }
        }
    } catch (err: any) {
        if (err.message === 'jwt expired') {
            createResponse(res, httpStatus.UNAUTHORIZED, (req as any).t('errorMessages.tokenExpired'));
        } else if (err.message === 'invalid signature' || err.message === 'jwt malformed') {
            createResponse(res, httpStatus.UNAUTHORIZED, (req as any).t('errorMessages.invalidToken'));
        } else {
            let errorStatus = err.status
            createResponse(res, errorStatus, err.message);
        }
    }
};

export default auth;