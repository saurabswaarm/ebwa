import { Reducer } from "redux";
import { AppState } from "../../../types/stateTypes";
import {REMOVE_USER, SET_USER, SET_USER_ERR} from '../actionTypes'

const authReducer: Reducer<AppState | undefined> = function (state, action) {
    switch (action.type) {
        case SET_USER_ERR: {
            return {
                user:action.payload,
                noticeBoard:false
            }
        }
        case SET_USER: {
            return {
                user:action.payload,
                noticeBoard:false
            }
        }
        case REMOVE_USER: {
            return {
                user:false,
                noticeBoard:false
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer;