import mongoose, { Model, Schema, Document } from "mongoose";

let genpass = require('generate-password');
let bcrypt = require('bcrypt');

export interface IUser extends Document {
    _id: string
    name:string
    email: string,
    phone: number,
    activated: boolean,
    designation: string,
    admin:boolean,
    cid:string,
    passHash:string,

    // statics and methods
    activateAccount:Function,
}

export interface IUserM extends Model<IUser> {
    getUserByEmail:Function,
    getUserById:Function
}

let userSchema:Schema<IUser> = new mongoose.Schema({
    email: { type: String, index: true },
    phone: { type: Number, index: true },
    name: {type: String},
    activated: { type: Boolean },
    cid: { type: String, index: true },
    designation: {type: String},
    admin: {type:Boolean},
    passHash: {
        type: String,
        required: true
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


let User:Model<IUser>= mongoose.model('users', userSchema);




export default User;

