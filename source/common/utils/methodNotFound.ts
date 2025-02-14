import { Request, Response, NextFunction } from "express";
import { apiResponse } from "./typeAliases";

/**
 * It sends the status code 405 with error message 'Method Not Found'.
 * This error indicates that the requested resource exists but can not be acceesed with the requested method.
 */
const methodNotAllowed = (req: Request, res:Response, next:NextFunction) : Response<apiResponse> => res.status(405).send({
    "message": (req as any).t('errorMessages.methodNotAllowed'),
});

export default methodNotAllowed;
