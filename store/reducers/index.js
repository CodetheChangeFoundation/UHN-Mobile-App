import { combineReducers } from "redux";
import TimerReducer from "./TimerReducer";
import AuthReducer from "./AuthReducer";
import RespondersReducer from "./RespondersReducer";
import UserDataReducer from "./UserDataReducer";

export default combineReducers({
    timer: TimerReducer,
    auth: AuthReducer,
    responders: RespondersReducer,
    userData: UserDataReducer
});