"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.EbwaError = void 0;
var EbwaError = /** @class */ (function () {
    function EbwaError(message, status, errorCode, redirect) {
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
        this.redirect = redirect;
    }
    return EbwaError;
}());
exports.EbwaError = EbwaError;
function errorHandler(err, req, res, next) {
    var responseObject = {
        code: err.errorCode >= 500 ? 500 : err.errorCode,
        payload: {
            status: err.status,
            message: err.message,
        }
    };
    err.redirect ? Object.assign(responseObject, { redirect: err.redirect }) : null;
    res.status(err.status);
    res.json(responseObject);
}
exports.errorHandler = errorHandler;
