import { SET_USER_ERR, SET_USER, REMOVE_USER, SET_NOTICEBOARD, REMOVE_NOTICEBOARD, SET_NOTICEBOARD_ERR} from './actionTypes';
import { UserCredentials, IUserF, AuthError, AuthResponse } from '../../types/authTypes';
import { Store, Action, Dispatch, AnyAction } from 'redux';
import { config } from '../config';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/stateTypes';



export const logInUser = function (credentialsObject: UserCredentials) {
    return async function (dispatch: Store['dispatch'], getState: Store['getState']) {
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
                dispatch(setUser(responseJson.payload.user))
            } else {
                dispatch(setUserErr(responseJson.payload))
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
            dispatch(removeUser())
        } else {
            dispatch(setUserErr(responseJson))
            dispatch(removeUser());
        }


    }
}

export const resumeSession = function() {
    console.log('resume session ran');
    return async function (dispatch: ThunkDispatch<AppState,void ,Action>, getState: Store['getState']) {
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

export const setUserErr: (arg0: AuthError) => Action = function (authError: AuthError) {
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

export const removeUser = function () {
    return {
        type: REMOVE_USER,
        payload: null
    }
}

export const setNoticeBoard = function(posts:any[]){
    return {
        type:SET_NOTICEBOARD,
        payload:posts
    }
}

export const removeNoticeBoard = function() {
    return {
        type:REMOVE_NOTICEBOARD,
        payload:null
    }
}

export const setNoticeBoardError = function(err:any) {
    return {
        type:SET_NOTICEBOARD_ERR,
        payload:err
    }
}

export const getNoticeBoard = function(){
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
            dispatch(removeUser())
        }
    } 
}



