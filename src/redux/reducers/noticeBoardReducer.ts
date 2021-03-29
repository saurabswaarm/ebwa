import { Reducer } from "redux";
import { AppState } from "../../../types/stateTypes";
import {SET_USER, SET_NO_USER} from '../actionTypes'

const noticeBoardReducer: Reducer<AppState | undefined> = function (state, action) {
    switch (action.type) {
        case 'SET_NO_USER': {
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

export default noticeBoardReducer;