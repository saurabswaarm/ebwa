import { Reducer } from "redux";
import { AppState, Actions } from "../../../types/reduxTypes";
import {REMOVE_USER, SET_USER, SET_USER_ERR} from '../actionTypes'

let initialState = false;

const authReducer: Reducer<AppState['user'] | undefined, Actions> = function (state = initialState, action) {
    switch (action.type) {

        case SET_USER: {
            return action.payload
        }
        case REMOVE_USER: {
            return false
        }
        default: {
            return state
        }
    }
}

export default authReducer;