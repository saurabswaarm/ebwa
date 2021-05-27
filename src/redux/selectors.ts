import { AppState } from "../../types/reduxTypes";

export const getUserFromState = (store:AppState) => {
    return store.user;
}

export const getPostsFromState = (store:AppState) => {
    return store.noticeBoard;
}

export const getErrorFromState = (store:AppState) => {
    return store.error;
}