import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { Alert } from "react-native";

const userInfoError = (error) => {
  Alert.alert(
      "User info error",
      error.response?.data?.errors[0]?.message || '',
      [{ text: "OK" }],
      { cancelable: true }
    );
}

const getUserInfo = async (userId, token) => {
  return axios.get(`${SERVER_ROOT}/users/${userId}`,
    {
      headers: { "Authorization": token },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {userInfoError(error)});
};

const getWatchingFor = async (userId, token) => {
  return axios.get(`${SERVER_ROOT}/users/${userId}/responding-to`,
    {
      headers: { "Authorization": token },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {userInfoError(error)});
}

module.exports = {
  getUserInfo,
  getWatchingFor
};