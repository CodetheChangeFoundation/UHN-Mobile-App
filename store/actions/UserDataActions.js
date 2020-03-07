import { SET_LOCATION, SET_NALOXONE_AVAILABILITY } from "./Types"
import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';

export const setLocalLocation = (location) => {
  return {
    type: SET_LOCATION,
    data: { location: location }
  };
}

const setNaloxoneAvailabilityHandler = (naloxoneAvailability) => {
  return {
    type: SET_NALOXONE_AVAILABILITY,
    data: { naloxoneAvailability: naloxoneAvailability }
  }
}

export const setStatus = (userId, statusToChange) => {
  return (dispatch) => {
    axios.post(`${SERVER_ROOT}/users/${userId}/status`,
      statusToChange)
      .then(response => {
        if (statusToChange.naloxoneAvailability != undefined) {
          dispatch(setNaloxoneAvailabilityHandler(statusToChange.naloxoneAvailability))
        }
      })
      .catch(error => {
        console.error(error.response);
      })
  }
}