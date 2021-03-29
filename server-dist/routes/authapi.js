"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authApiRouter = express_1.default.Router();
var userSchema_1 = __importDefault(require("../schema/userSchema"));
var errorHandler_1 = require("../middleware/errorHandler");
// import logger from '../logger';
var passport_1 = __importDefault(require("passport"));
var mailerModule_1 = __importDefault(require("../lib/mailerModule"));
var authMiddleware_1 = require("../middleware/authMiddleware");
var userDbUtil_1 = require("../lib/userDbUtil");
authApiRouter.post('/createaccount', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, password, passHash, message, activatedUser, info, err_1, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 12, , 13]);
                    return [4 /*yield*/, userSchema_1.default.findOne({ email: req.body.email }).exec()];
                case 1:
                    user = _b.sent();
                    if (!user) return [3 /*break*/, 10];
                    if (!user.activated) return [3 /*break*/, 2];
                    next(new errorHandler_1.EbwaError('User already activated, please login', 200, 2, '/login'));
                    return [3 /*break*/, 9];
                case 2:
                    _b.trys.push([2, 7, , 9]);
                    return [4 /*yield*/, user.activateAccount()];
                case 3:
                    _a = _b.sent(), password = _a[0], passHash = _a[1];
                    message = 'Your EBWA portal password is ' + password;
                    return [4 /*yield*/, user.save()];
                case 4:
                    activatedUser = _b.sent();
                    if (!(password && activatedUser)) return [3 /*break*/, 6];
                    return [4 /*yield*/, mailerModule_1.default(req.body.email, "Welcome to EBWA", message)];
                case 5:
                    info = _b.sent();
                    console.log(info);
                    res.json({
                        code: 1,
                        payload: {
                            message: 'Account details have been mailled to ' + info.accepted[0],
                            redirect: '/login'
                        }
                    });
                    _b.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    err_1 = _b.sent();
                    user.activated = false;
                    return [4 /*yield*/, user.save()];
                case 8:
                    _b.sent();
                    next(new errorHandler_1.EbwaError('Failled to generate a password or send mail, reverting user to inactive, please try again or contant sys admin.', 500, 500));
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 11];
                case 10:
                    next(new errorHandler_1.EbwaError('User not found, we have not yet received or processed your records.', 200, 455));
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    err_2 = _b.sent();
                    console.log(err_2);
                    next(new errorHandler_1.EbwaError(err_2.message, 500, 500));
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
});
authApiRouter.post('/login', authMiddleware_1.isLogInNecessary, function (req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new errorHandler_1.EbwaError(info, 401, 401));
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({
                code: 2,
                payload: {
                    user: userDbUtil_1.trimUserObject(user)
                }
            });
        });
    })(req, res, next);
});
authApiRouter.post('/logout', function (req, res, next) {
    if (req.user) {
        var user_1 = req.user;
        console.log('logging out ' + user_1.email);
        req.session.destroy(function (err) {
            if (err) {
                return next(new errorHandler_1.EbwaError(err.message, 200, 458));
            }
            req.logOut();
            res.clearCookie('session-ebwa');
            res.json({
                code: 3,
                payload: {
                    userEmail: user_1.email
                }
            });
        });
    }
});
exports.default = authApiRouter;
