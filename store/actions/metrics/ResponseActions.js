import * as axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { METRIC_RESPONSE_FAILED, SET_RESPONSELOG_ID } from "../Types";

export const makeResponseLog = (userID, alarmID, response, token) => {
  let time = new Date().toUTCString();

  let data = {
    userID: userID,
    alarmID: alarmID,
    response: response,
    responseTime: time
  };

  return (dispatch) => {
    axios.post(SERVER_ROOT + "/metrics/response", data, {
      headers: { "Authorization": token },
    })
    .then( (response) => {
      dispatch(setResponseLogID(response.data.id));
    })
    .catch((error) => {
      dispatch(metricResponseError(error));
    })
  };
}

const setResponseLogID = (responseID) => {
  return {
    type: SET_RESPONSELOG_ID,
    data: responseID
  }
}

export const metricResponseError = (error) => {
  console.log("Response Metric Error: ", error);
  return {
    type: METRIC_RESPONSE_FAILED
  }
}