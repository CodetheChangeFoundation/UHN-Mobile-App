import { SET_LOCATION, SET_NALOXONE_AVAILABILITY, SET_NUMBER_OF_RESPONDERS } from "./Types";
import * as axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { Actions } from "react-native-router-flux";
import * as TokenService from "../../services/token.service";

export const setLocalLocation = location => {
  return {
    type: SET_LOCATION,
    data: { location: location }
  };
};

const setNaloxoneAvailabilityHandler = naloxoneAvailability => {
  return {
    type: SET_NALOXONE_AVAILABILITY,
    data: { naloxoneAvailability: naloxoneAvailability }
  };
};

export const setStatus = (userId, token, statusToChange) => {
  return dispatch => {
    axios
      .post(`${SERVER_ROOT}/users/${userId}/status`, statusToChange, TokenService.getHeader(token))
      .then(response => {
        if (statusToChange.naloxoneAvailability != undefined) {
          dispatch(setNaloxoneAvailabilityHandler(statusToChange.naloxoneAvailability));
        }
      })
      .catch(error => {
        Actions.alert({
          alertTitle: "Failed to set user status!",
          alertBody: error.response?.data?.errors[0]?.message || "",
          positiveButton: { text: "OK" }
        });
      });
  };
};

export const setAvailableResponderCount = count => {
  return {
    type: SET_NUMBER_OF_RESPONDERS,
    data: { respondersAvailable: count }
  };
};

export const getNumberOfAvailableResponders = (userId, token) => {
  var url = `${SERVER_ROOT}/users/${userId}/responders/count`;
  return dispatch => {
    axios
      .get(url, TokenService.getHeader(token))
      .then(response => {
        dispatch(setAvailableResponderCount(response.data.count));
      })
      .catch(error => {
        Actions.alert({
          alertTitle: "Failed to fetch number of available responders.",
          alertBody: error.response?.data?.errors[0]?.message || "",
          positiveButton: { text: "OK", onPress: () => Actions.main() },
          cancelable: true
        });
      });
  };
};
