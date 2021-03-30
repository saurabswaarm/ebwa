import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import {AppState} from '../../types/stateTypes'
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";
import noticeBoardReducer from "./reducers/noticeBoardReducer";

const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunk)
);

let rootReducer = combineReducers({
    user:authReducer,
    error:errorReducer,
    noticeBoard:noticeBoardReducer
})

export default createStore(rootReducer, composedEnhancer);