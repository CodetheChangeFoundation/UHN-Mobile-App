import { combineReducers } from 'redux';
import TimerReducer from './TimerReducer';
import AuthReducer from './AuthReducer'

export default combineReducers({
    timer: TimerReducer,
    auth: AuthReducer
});