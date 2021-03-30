import mongoose, { Model, Schema, Document } from "mongoose";
import {IUserD, IUserM} from '../../types/authTypes';

let genpass = require('generate-password');
let bcrypt = require('bcrypt');

let userSchema:Schema<IUserD> = new mongoose.Schema({
    email: { type: String, index: true },
    phone: { type: Number, index: true },
    name: {type: String},
    activated: { type: Boolean },
    verified: {type:Boolean},
    verifiedBy: {
        _id:String,
        name:String,
    },
    cid: { type: String, index: true },
    designation: {type: String},
    admin: {type:Boolean},
    passHash: {
        type: String,
    },
});

userSchema.methods.activateAccount = async function() {

    let password = genpass.generate({
        length: 5,
        numbers: false
    });

    try {
        let passHash = await bcrypt.hash(password, 10);
        this.passHash = passHash ? passHash : this.passHash;
        this.activated = true;
        return [password, passHash];
    } catch (err) {
        throw new mongoose.Error('Failled to activate account');
    }
}

userSchema.statics.getUserByEmail = function(email: String, cb:Function) {
    console.log("Find by email from statics");
    return this.findOne(({ email }));
}

userSchema.statics.getUserById = function (id: String) {
    return this.findById(id);
}


let User= mongoose.model('users', userSchema) as IUserM;

export default User;

