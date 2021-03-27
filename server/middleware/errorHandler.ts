import express from 'express';

export class EbwaError {
    status: number;
    errorCode: number;
    message: String;
    redirect?:String;
    constructor(message: String, status: number, errorCode: number, redirect?: String) {
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
        this.redirect = redirect;
    }
}

export function errorHandler(err: EbwaError, req: express.Request, res: express.Response, next: express.NextFunction) {
    let responseObject = {
        code: err.errorCode >= 500 ? 500 : err.errorCode,
        payload: {
            status: err.status,
            message: err.message,
        }
    }

    err.redirect ? Object.assign(responseObject, {redirect:err.redirect}) : null ;

    res.status(err.status);
    res.json(responseObject);
}