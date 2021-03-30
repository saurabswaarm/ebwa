import { Reducer } from "redux";
import { AppState } from "../../../types/stateTypes";
import {SET_NOTICEBOARD, REMOVE_NOTICEBOARD} from '../actionTypes'

let initialState = false;

const noticeBoardReducer: Reducer<AppState["noticeBoard"] | undefined> = function (state = initialState, action) {
    switch (action.type) {
        case SET_NOTICEBOARD: {
            return action.payload
        }
        case REMOVE_NOTICEBOARD: {
            return false
        }
        default: {
            return state
        }
    }
}

export default noticeBoardReducer;