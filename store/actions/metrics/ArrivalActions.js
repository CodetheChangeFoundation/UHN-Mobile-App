import * as axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { METRIC_ARRIVAL_FAILED, SET_ARRIVALLOG_ID } from "../Types";
import { metricAlarmError } from "./AlarmActions";

export const makeArrivalLog = (responseID) => {
  let time = new Date().toUTCString();

  let data = {
    responseID: responseID,
    arrivalTime: time
  }

  return (dispatch) => {
    axios.post(SERVER_ROOT + "/metrics/arrival", data, {
      headers: { "Authorization": token },
    })
    .catch( (error) => {
      dispatch(metricAlarmError(error));
    })
  }
}

export const metricArrivalError = (error) => {
  console.log("Arrival Metric Error: ", error);
  return {
    type: METRIC_ARRIVAL_FAILED
  }
}