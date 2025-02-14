import { Response } from "express";
import { apiResponse } from "./typeAliases";

// This function creates a response object with given status code, message and payload. 

/*
Please make sure following things.
    1. Incoming arguments to this function must have respective types as mentioned. Payload must be an object or an array of objects.
    2. Return a return a response of the type interface apiResponse. Response parameter 'data' must be an object or an array of objects. 
*/

const createResponse = (res: Response, status: number, message: string, payload?: Array<object> | object): Response<apiResponse> => {
    return res.status(status).json({
        message: message,
        data: payload,
    });
};

export default createResponse

