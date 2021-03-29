import { IUserF } from "./authTypes";

export interface AppState {
    user:boolean | IUserF | any,
    noticeBoard: boolean | any
}