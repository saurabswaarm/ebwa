import { Reducer } from "redux";
import { AppState } from "../../../types/stateTypes";
import {REMOVE_USER, SET_NOTICEBOARD_ERR, SET_USER, SET_USER_ERR} from '../actionTypes'

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
        default: {
            return state
        }
    }
}

export default errorReducer;