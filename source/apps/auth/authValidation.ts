import Joi from '@hapi/joi';

const userLogin = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ tlds: { allow: false } }) // Basic email format validation
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Custom regex for additional email validation
            .required()
            .label('emailA'),
        password: Joi.string()
            .required()
            .label('password')
    }),
}



const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ tlds: { allow: false } }) // Basic email format validation
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Custom regex for additional email validation
            .required()
            .label('emailA'),
    }),
}
const resendOTP = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ tlds: { allow: false } }) // Basic email format validation
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Custom regex for additional email validation
            .required()
            .label('emailA'),
    }),
}


const resetPassword = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ tlds: { allow: false } }) // Basic email format validation
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Custom regex for additional email validation
            .required()
            .label('emailA'),
        password: Joi.string().label('password'),
        confirmPassword: Joi.string().label('passwordConfirm')
    }),
}


export default {
    userLogin,
    forgotPassword,
    resetPassword,
    resendOTP
}