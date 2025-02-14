import moment from "moment";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from '../common/config/config';
import appError from '../common/utils/appError';
import httpStatus from 'http-status';
import { Request } from 'express';
import userModel from "../model/userModel";
import authModel from "../model/authModel";

/**This function is used to generate the token. 
 * It takes email, phoneNumber, expires and secret as parameters.
 * email and phoneNumber are used to generate the payload of the token.
 * expires is used to set the expiration time of the token.
 * secret is used to sign the token.
 */
const generateToken = (email: string, phoneNumber: string, deviceId: string, expires: { unix: () => any; }, secret = config.jwt.secret) => {
    /**
     * Generates a JSON Web Token (JWT) with the given email and phoneNumber.
     * @param {string} role - The role of the user to include in the JWT payload.
     * @param {moment.Moment} expires - The moment object representing the expiration time of the JWT.
     * @param {string} secret - The secret key to use for signing the JWT.
     * @returns {string} - The generated JWT.
     */
    const payload = {
        sub: { email, phoneNumber, deviceId },
        iat: moment().unix(),
        exp: expires.unix()
    };
    return jwt.sign(payload, secret);
};


const generateTokenAdmin = (email: string, expires: { unix: () => any; }, secret = config.jwt.secret) => {
    /**
     * Generates a JSON Web Token (JWT) with the given email and phoneNumber.
     * @param {string} role - The role of the user to include in the JWT payload.
     * @param {moment.Moment} expires - The moment object representing the expiration time of the JWT.
     * @param {string} secret - The secret key to use for signing the JWT.
     * @returns {string} - The generated JWT.
     */
    const payload = {
        sub: { email },
        iat: moment().unix(),
        exp: expires.unix()
    };
    return jwt.sign(payload, secret);
};
/**
* Generates an access token and a refresh token for the given email and phoneNumber.
*/
const generateAuthTokens = async (req: Request, userId: string) => {
    const userData = await userModel.findById(userId);
    if (userData == null) {
        throw new appError(httpStatus.NOT_FOUND, (req as any).t('errorMessages.userNotFound'));
    }
    const { email, phoneNumber, deviceId } = userData;

    const accessTokenExpires = moment().add(config.jwt.accessExpirationDays, 'days');

    const accessToken = generateToken(email, phoneNumber, deviceId, accessTokenExpires);
    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(email, phoneNumber, deviceId, refreshTokenExpires);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};

const generateAuthTokensAdmin = async (req: Request, userId: string) => {
    const userData = await authModel.findById(userId);
    if (userData == null) {
        throw new appError(httpStatus.NOT_FOUND, (req as any).t('errorMessages.userNotFound'));
    }
    const { email, name } = userData;

    const accessTokenExpires = moment().add(30, 'days');

    const accessToken = generateTokenAdmin(email, accessTokenExpires);
    const refreshTokenExpires = moment().add(90, 'days');
    const refreshToken = generateTokenAdmin(email, refreshTokenExpires);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};

/**
 * Verifies the authenticity of a token using JWT.
 * If the token is verified successfully, it returns the payload of the token.
 * If the token is invalid or expired, it throws an error.
 */
const verifyToken = async (req: Request) => {
    /**
     * Verifies the given JWT token using the secret from the configuration file.
     * If the token is valid, returns the payload of the token.
     * If the token is invalid or expired, throws an error.
     */
    try {
        let { refreshToken }: { refreshToken: string } = req.body;
        const payload = jwt.verify(refreshToken, config.jwt.secret) as JwtPayload;
        return payload;
    }
    catch (err: any) {
        if (err.message === 'jwt expired') {
            throw new appError(httpStatus.UNAUTHORIZED, (req as any).t('errorMessages.tokenExpired'));
        } else if (err.message === 'invalid signature') {
            throw new appError(httpStatus.UNAUTHORIZED, (req as any).t('errorMessages.invalidToken'));
        } else if (err.message === 'jwt malformed') {
            throw new appError(httpStatus.UNAUTHORIZED, (req as any).t('errorMessages.invalidToken'));
        }
        else {
            throw new appError(err.status, err.message);
        }
    }
};

export default {
    generateAuthTokens,
    generateAuthTokensAdmin,
    verifyToken
};