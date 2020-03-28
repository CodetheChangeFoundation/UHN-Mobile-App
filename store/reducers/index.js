import { combineReducers } from "redux";
import TimerReducer from "./TimerReducer";
import AuthReducer from "./AuthReducer";
import RespondersReducer from "./RespondersReducer";
import UserDataReducer from "./UserDataReducer";

import AlarmReducer from "./metrics/AlarmReducer";
import ResponseReducer from "./metrics/ResponseReducer";

import NotificationReducer from "./NotificationReducer";

export default combineReducers({
    timer: TimerReducer,
    auth: AuthReducer,
    responders: RespondersReducer,
    userData: UserDataReducer,
    metricAlarm: AlarmReducer,
    metricResponse: ResponseReducer,
    notification: NotificationReducer
});