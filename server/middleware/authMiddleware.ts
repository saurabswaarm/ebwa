import express from 'express';
import { EbwaError } from './errorHandler';
import {IUser} from '../schema/userSchema';
import Post, {IPost} from '../schema/postSchema';


export function isLoggedIn(req: express.Request, res: express.Response, next: express.NextFunction) {
    if(req.user){
        next();
    } else {
        next(new EbwaError('You are not authorised to view this resource', 401, 401, '/login'))
    }
}

export function isLogInNecessary(req: express.Request, res: express.Response, next: express.NextFunction){
    if(req.user){
        next(new EbwaError('You are already logged in.', 200, 458))
    } else {
        next();
    }
}

//isMCMember

export function isAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    if(<IUser>req.user && (<IUser>req.user).admin){
        next();
    } else {
        next(new EbwaError('You are not authorised to edit this resource', 401, 401, '/login'))
    }
}