import { combineReducers } from "redux";
import TimerReducer from "./TimerReducer";
import AuthReducer from "./AuthReducer";
import RespondersReducer from "./RespondersReducer";
import UserDataReducer from "./UserDataReducer";
import MetricReducer from "./MetricReducer";

export default combineReducers({
    timer: TimerReducer,
    auth: AuthReducer,
    responders: RespondersReducer,
    userData: UserDataReducer,
    metrics: MetricReducer
});