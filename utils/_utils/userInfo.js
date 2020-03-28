import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { Actions } from "react-native-router-flux";

const getUserInfo = async (userId, token) => {
  return axios.get(`${SERVER_ROOT}/users/${userId}`,
    {
      headers: { "Authorization": token },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Actions.alert({
        alertTitle: "Error getting user!!",
        alertBody: error.response?.data?.errors[0]?.message || '',
        positiveButton: { text: "OK" },
        cancelable: true
      });
    });
};

module.exports = {
  getUserInfo
};