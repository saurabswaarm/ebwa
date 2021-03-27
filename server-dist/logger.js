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
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var AWS = require("aws-sdk");
function init() {
    AWS.config.getCredentials(function (err) {
        if (err)
            console.log(err.stack);
        else {
            console.log("Access key:", AWS.config.credentials.accessKeyId);
            console.log('Region', AWS.config.region);
        }
    });
    AWS.config.logger = console;
}
exports.init = init;
var sequenceToken = 'something';
function default_1(log) {
    return __awaiter(this, void 0, void 0, function () {
        function attemptLogging() {
            return __awaiter(this, void 0, void 0, function () {
                var ourPromise, data, err_1, errorMessage, arrayOfWords, sequenceTokenderived;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ourPromise = new Promise(function (resolve, reject) {
                                var cwl = new AWS.CloudWatchLogs();
                                cwl.putLogEvents({
                                    logEvents: [{ timestamp: Date.now(), message: log }],
                                    logGroupName: 'Ebwa_Server_Error_log_group',
                                    logStreamName: 'main_log_stream',
                                    sequenceToken: sequenceToken
                                }, function (err, data) {
                                    if (err) {
                                        reject(err);
                                    }
                                    resolve(data);
                                });
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, ourPromise];
                        case 2:
                            data = _a.sent();
                            console.log(data);
                            sequenceToken = data.nextSequenceToken;
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            if (err_1.code == 'InvalidSequenceTokenException') {
                                errorMessage = err_1.message;
                                arrayOfWords = errorMessage.split(' ');
                                sequenceTokenderived = arrayOfWords[arrayOfWords.length - 1];
                                sequenceToken = sequenceTokenderived;
                                console.log(sequenceTokenderived);
                                if (logAttempts <= 3) {
                                    attemptLogging();
                                    logAttempts++;
                                }
                            }
                            else {
                                console.log(err_1);
                            }
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var logAttempts;
        return __generator(this, function (_a) {
            console.log('logger ran');
            logAttempts = 0;
            attemptLogging();
            return [2 /*return*/];
        });
    });
}
exports.default = default_1;
