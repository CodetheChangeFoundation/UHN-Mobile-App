import * as axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { METRIC_ALARM_FAILED, SET_ALARMLOG_ID } from "./Types";

export const makeAlarmLog = (data, token) => {
  return (dispatch) => {
    axios.post(SERVER_ROOT+"/metrics/alarm", data, {
      headers: { "Authorization": token },
    })
    .then( (response) => {
      dispatch(setAlarmLogID(response.data.alarmID));
    })
    .catch((error) => {
      dispatch(metricAlarmError(error));
    })
  };
}

const setAlarmLogID = (alarmID) => {
  return {
    type: SET_ALARMLOG_ID,
    data: {
      alarmID
    }
  }
}

export const metricAlarmError = (error) => {
  console.log("Alarm Metric Error:", error);
  return {
    type: METRIC_ALARM_FAILED
  };
}
