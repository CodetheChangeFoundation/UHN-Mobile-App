import { combineReducers } from "redux";
import TimerReducer from "./TimerReducer";
import AuthReducer from "./AuthReducer";
import RespondersReducer from "./RespondersReducer";
import UserDataReducer from "./UserDataReducer";
import AlarmReducer from "./metrics/AlarmReducer";
import NotificationReducer from "./NotificationReducer";

export default combineReducers({
    timer: TimerReducer,
    auth: AuthReducer,
    responders: RespondersReducer,
    userData: UserDataReducer,
    alarm: AlarmReducer,
    notification: NotificationReducer
});