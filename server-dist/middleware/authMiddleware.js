"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isLogInNecessary = exports.isLoggedIn = void 0;
var errorHandler_1 = require("./errorHandler");
var userDbUtil_1 = require("../lib/userDbUtil");
function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        next(new errorHandler_1.EbwaError('You are not authorised to view this resource', 401, 401, '/login'));
    }
}
exports.isLoggedIn = isLoggedIn;
function isLogInNecessary(req, res, next) {
    if (req.user) {
        res.json({
            code: 2,
            payload: {
                user: userDbUtil_1.trimUserObject(req.user)
            }
        });
    }
    else {
        next();
    }
}
exports.isLogInNecessary = isLogInNecessary;
//isMCMember
function isAdmin(req, res, next) {
    if (req.user && req.user.admin) {
        next();
    }
    else {
        next(new errorHandler_1.EbwaError('You are not authorised to edit this resource', 401, 401, '/login'));
    }
}
exports.isAdmin = isAdmin;
