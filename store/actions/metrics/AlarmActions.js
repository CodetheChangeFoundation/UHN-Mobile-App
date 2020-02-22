import * as axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { METRIC_ALARM_FAILED, SET_ALARMLOG_ID } from "../Types";

export const makeAlarmLog = (userId, duration, token) => {
  let start = new Date();
  let end = new Date();
  end.setSeconds(start.getSeconds()+duration);

  let data = {
    userID: userId,
    startTime: start.toUTCString(),
    endTime: end.toUTCString()
  };

  return (dispatch) => {
    axios.post(SERVER_ROOT + "/metrics/alarm", data, {
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

export const changeAlarmEnd = (duration, alarmID, token) => {
  let newEnd = new Date();
  newEnd.setSeconds(newEnd.getSeconds() + duration);

  return (dispatch) => {
    axios.put(SERVER_ROOT + "/metrics/alarm/" + alarmID, 
    {
      newEndTime: newEnd.toUTCString()
    }, 
    {
      headers: { "Authorization": token }
    })
    .then((response) => {
      dispatch(setAlarmLogID(response.data.alarmID))
    })
    .catch((error) => {
      console.log(error)
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
