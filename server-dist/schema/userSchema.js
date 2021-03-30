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
var mongoose_1 = __importDefault(require("mongoose"));
var genpass = require('generate-password');
var bcrypt = require('bcrypt');
var userSchema = new mongoose_1.default.Schema({
    email: { type: String, index: true },
    phone: { type: Number, index: true },
    name: { type: String },
    activated: { type: Boolean },
    verified: { type: Boolean },
    verifiedBy: {
        _id: String,
        name: String,
    },
    cid: { type: String, index: true },
    designation: { type: String },
    admin: { type: Boolean },
    passHash: {
        type: String,
    },
});
userSchema.methods.activateAccount = function () {
    return __awaiter(this, void 0, void 0, function () {
        var password, passHash, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = genpass.generate({
                        length: 5,
                        numbers: false
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    passHash = _a.sent();
                    this.passHash = passHash ? passHash : this.passHash;
                    this.activated = true;
                    return [2 /*return*/, [password, passHash]];
                case 3:
                    err_1 = _a.sent();
                    throw new mongoose_1.default.Error('Failled to activate account');
                case 4: return [2 /*return*/];
            }
        });
    });
};
userSchema.statics.getUserByEmail = function (email, cb) {
    console.log("Find by email from statics");
    return this.findOne(({ email: email }));
};
userSchema.statics.getUserById = function (id) {
    return this.findById(id);
};
var User = mongoose_1.default.model('users', userSchema);
exports.default = User;
