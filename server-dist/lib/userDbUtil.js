"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimUserObject = void 0;
var trimUserObject = function (userObject) {
    var trimmedUserObject = {
        _id: userObject._id,
        name: userObject.name,
        email: userObject.email,
        cid: userObject.cid,
        designation: userObject.designation,
        admin: userObject.admin,
        phone: userObject.phone
    };
    return trimmedUserObject;
};
exports.trimUserObject = trimUserObject;
