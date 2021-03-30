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
var authMiddleware_1 = require("../middleware/authMiddleware");
var errorHandler_1 = require("../middleware/errorHandler");
var postSchema_1 = __importDefault(require("../schema/postSchema"));
var postsApiRouter = express_1.default.Router();
postsApiRouter.get('/', authMiddleware_1.isLoggedIn, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var posts, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, postSchema_1.default.find()];
                case 1:
                    posts = _a.sent();
                    res.json({
                        code: 4,
                        payload: {
                            posts: posts
                        }
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    next(new errorHandler_1.EbwaError(err_1.message, 500, 500));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
postsApiRouter.post('/', authMiddleware_1.isAdmin, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, postCreated, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = req.user;
                    console.log(user.name);
                    if (!(req.body.title && req.body.subject && req.body.message)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, postSchema_1.default.create({
                            title: req.body.title,
                            subject: req.body.subject,
                            message: req.body.message,
                            date: new Date(),
                            author: {
                                id: user._id,
                                name: user.name,
                                designation: user.designation
                            }
                        })];
                case 2:
                    postCreated = _a.sent();
                    res.json({
                        code: 5,
                        payload: {
                            post: postCreated
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    next(new errorHandler_1.EbwaError(err_2.message, 500, 500));
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    next(new errorHandler_1.EbwaError('Incomplete Post Submitted', 200, 457));
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
});
exports.default = postsApiRouter;
