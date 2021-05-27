import { Reducer } from "redux";
import { AppState } from "../../../types/reduxTypes";
import {REMOVE_NOTICEBOARD_ERR, REMOVE_USER_ERR, REMOVE_USER, SET_NOTICEBOARD_ERR, SET_USER, SET_USER_ERR} from '../actionTypes'

let initialState = {
    user:false,
    noticeBoard:false
};

const errorReducer: Reducer<AppState["error"] | undefined> = function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_ERR: {
            return {
                ...state,
                user: action.payload
            }
        }
        case SET_NOTICEBOARD_ERR: {
            return {
                ...state,
                noticeBoard: action.payload
            }
        }
        case REMOVE_NOTICEBOARD_ERR: {
            return {
                ...state,
                noticeBoard:false
            }
        }
        case REMOVE_USER_ERR: {
            return {
                ...state,
                user:false
            }
        }
        default: {
            return state
        }
    }
}

export default errorReducer;