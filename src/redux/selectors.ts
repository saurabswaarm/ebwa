import { AppState } from "../../types/stateTypes";

export const getUserFromState = (store:AppState) => {
    return store.user;
}

export const getPostsFromState = (store:AppState) => {
    return store.noticeBoard;
}