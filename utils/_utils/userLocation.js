import * as axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { Actions } from "react-native-router-flux";
import * as TokenService from "../../services/token.service";

const locationsError = error => {
  console.error(error);
  Actions.alert({
    alertTitle: "Location request failed!",
    alertBody: error.response?.data?.errors[0]?.message || "",
    positiveButton: { text: "OK" },
    cancelable: true
  });
};

// GET Request from db, returns promise
// response --> location: { coords: { lat, lng }, note }
export const getUserLocation = payload => {
  return axios
    .get(SERVER_ROOT + "/users/" + payload.id + "/location", TokenService.getHeader(payload.token))
    .then(response => {
      return response.data;
    })
    .catch(error => {
      locationsError(error);
    });
};

// PUT Request to db, returns promise
// payload --> location: { coords: { lat, lng }, note }
export const updateUserLocation = payload => {
  return axios
    .put(
      SERVER_ROOT + "/users/" + payload.id + "/location",
      payload.data,
      TokenService.getHeader(payload.token)
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      locationsError(error);
    });
};
