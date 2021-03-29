import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import {AppState} from '../../types/stateTypes'

const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunk)
);



const preloadedState:AppState = {
    user:false,
    noticeBoard:false
}

export default createStore<AppState | undefined, any, {
    dispatch: unknown;
}, unknown>(authReducer, preloadedState, composedEnhancer);