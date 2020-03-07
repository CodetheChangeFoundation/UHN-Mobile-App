import { SET_ALARMLOG_ID } from "../../actions/Types";

const initialState = {
  currentAlarmLog: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALARMLOG_ID:
      return { ...state, currentAlarmLog: action.data.alarmID };
    default:
      return state;
  }
}