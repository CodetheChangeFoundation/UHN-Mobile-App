import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { Actions } from "react-native-router-flux";
import * as TokenService from "../../services/token.service";

const getUserInfo = async (userId, token) => {
  return axios
    .get(`${SERVER_ROOT}/users/${userId}`, TokenService.getHeader(token))
    .then(response => {
      return response;
    })
    .catch(err => {
      Actions.alert({
        alertTitle: "Error getting user!!",
        alertBody: error.response?.data?.errors[0]?.message || "",
        positiveButton: { text: "OK" },
        cancelable: true
      });
    });
};

const getWatchingFor = async (userId, token) => {
  return axios
    .get(`${SERVER_ROOT}/users/${userId}/responding-to`, TokenService.getHeader(token))
    .then(response => {
      return response;
    })
    .catch(error => {
      userInfoError(error);
    });
};

module.exports = {
  getUserInfo,
  getWatchingFor
};
