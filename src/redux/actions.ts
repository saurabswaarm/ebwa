import { SET_USER_ERR, SET_USER, REMOVE_USER, SET_NOTICEBOARD, REMOVE_NOTICEBOARD, SET_NOTICEBOARD_ERR, REMOVE_USER_ERR, REMOVE_NOTICEBOARD_ERR } from './actionTypes';
import { UserCredentials, IUserF, AuthResponse } from '../../types/authTypes';
import {Error} from '../../types/serverResponseTypes'
import { Store, Action, Dispatch, AnyAction } from 'redux';
import { config } from '../config';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/reduxTypes';
import { IPost } from '../../types/postTypes';
import qs from 'qs';


export const logInUser = function (credentialsObject: UserCredentials, callBack:Function) {
    return async function (dispatch: ThunkDispatch<AppState, void, Action>, getState: Store['getState']) {
        try {
            let response: Response = await fetch(
                `${config.host}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(credentialsObject),
                }
            );

            let responseJson = await response.json();

            if (responseJson.code == 2) {
                dispatch(setUser(responseJson.payload.user));
                dispatch(getNoticeBoard());
                callBack(true);
            } else {
                dispatch(setUserErr(responseJson));
                callBack(false)
            }
        } catch (err) {
            console.log(err);
            dispatch(removeUser())
        }
    }
}

export const logOutUser = function () {
    return async function (dispatch: Dispatch<AnyAction>, getState: Store['getState']) {
        console.log('Logout action fired');
        let response: Response = await fetch(
            `${config.host}/api/auth/logout`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            }
        )

        let responseJson = await response.json();

        if (responseJson.code == 3) {
            dispatch(removeUser());
            dispatch(removeNoticeBoard());
        } else {
            dispatch(setUserErr(responseJson))
            dispatch(removeUser());
        }


    }
}

export const resumeSession = function () {
    console.log('resume session ran');
    return async function (dispatch: ThunkDispatch<AppState, void, Action>, getState: Store['getState']) {
        try {
            let response: Response = await fetch(
                `${config.host}/api/auth/resumesession`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include'
                }
            )

            let responseJson = await response.json();

            if (responseJson.code == 2) {
                dispatch(setUser(responseJson.payload.user));
                dispatch(getNoticeBoard());
            } else {
                console.log(responseJson)
                dispatch(setUserErr(responseJson))
                dispatch(removeUser());
            }
        } catch (err) {
            console.log(err);
            dispatch(removeUser())
        }
    }
}

export const setUser = function (userObject: IUserF) {
    return {
        type: SET_USER,
        payload: userObject
    }
}

export const setUserErr = function (authError: Error) {
    console.log(authError);
    return {
        type: SET_USER_ERR,
        payload: {
            code: authError.code,
            status: authError.payload.status,
            message: authError.payload.message
        }
    }
}

export const removeUserErr = function() {
    return {
        type: REMOVE_USER_ERR,
        payload: null
    }
}

export const removeUser = function () {
    return {
        type: REMOVE_USER,
        payload: null
    }
}

export const setNoticeBoard = function (posts: any[]) {
    return {
        type: SET_NOTICEBOARD,
        payload: posts
    }
}

export const removeNoticeBoard = function () {
    return {
        type: REMOVE_NOTICEBOARD,
        payload: null
    }
}

export const setNoticeBoardError = function (err: any) {
    return {
        type: SET_NOTICEBOARD_ERR,
        payload: err
    }
}

export const removeNoticeBoardError = function () {
    return {
        type: REMOVE_NOTICEBOARD_ERR,
        payload: null
    }
}

export const getNoticeBoard = function () {
    return async function (dispatch: Store['dispatch'], getState: Store['getState']) {
        try {
            let response: Response = await fetch(
                `${config.host}/api/posts`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                }
            );

            let responseJson = await response.json();

            if (responseJson.code == 4) {
                dispatch(setNoticeBoard(responseJson.payload.posts))
            } else {
                dispatch(setNoticeBoardError(responseJson));
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const addPost = function (post: Partial<IPost>) {
    return async function (dispatch: ThunkDispatch<AppState, void, Action>, getState: Store['getState']) {
        try {
            let response: Response = await fetch(
                `${config.host}/api/posts`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(post)
                }
            );

            let responseJson = await response.json();

            if (responseJson.code == 5) {
                dispatch(getNoticeBoard());
            } else {
                dispatch(setNoticeBoardError(responseJson()))
            }
        } catch (err) {
            console.log(err);
        }
    }

}


export const addUser = function (user: Partial<IUserF>, history:any) {
    return async function (dispatch: Store['dispatch'], getState: Store['getState']) {
        try {
            let response: Response = await fetch(`${config.host}/api/auth/adduser`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(user)

                })

            let responseJson = await response.json();

            if (responseJson.code == 6) {
                let qstr = qs.stringify({
                    action:`added a new user`,
                    message:`Added ${responseJson.payload.user.email} as new user.`
                })
                history.push(`/f/success?${qstr}`);
            } else {
                let qstr = qs.stringify({
                    error:`Failed to add ${user.email} as new user.`
                })
                history.push(`/f/error?${qstr}`); 
            }
        } catch (err) {

        }
    }
}

