import { Document, Model } from 'mongoose';
import { ServerResponse } from './serverResponseTypes';

export interface UserCredentials {
    email: string,
    password: string
}

export interface IUserF {
    _id:string
    name: string
    email: string,
    phone: number,
    designation: string,
    admin: boolean,
    cid: string,
}

// As it exists in our database
export interface IUser {
    _id: string
    name:string
    email: string,
    phone: number,
    activated: boolean,
    verified: boolean,
    verifiedBy:string,
    designation: string,
    admin:boolean,
    cid:string,
    passHash:string, 
}

export interface IUserD extends Document {
    _id: string
    name:string
    email: string,
    phone: number,
    activated: boolean,
    verified:boolean
    designation: string,
    admin:boolean,
    cid:string,
    passHash:string,

    // statics and methods
    activateAccount:Function,
}

export interface IUserM extends Model<IUserD, {}> {
    getUserByEmail:Function,
    getUserById:Function
}

export interface AuthResponse extends ServerResponse {
    payload:{
        user:IUserF
    }
}