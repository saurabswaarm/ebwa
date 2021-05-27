import { Error, IUserF } from "./authTypes";

export interface AppState {
    user?:boolean | IUserF | any,
    noticeBoard?: boolean | any
    error?:AppError
}

export interface AppError {
    user:Error | false;
    noticeBoard: Error | false;
}

export interface Actions {
    type:string,
    payload:any
}