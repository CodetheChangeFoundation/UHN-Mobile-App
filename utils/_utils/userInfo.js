import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";

const getUserInfo = async (userId, token) => {
  return axios.get(`${SERVER_ROOT}/users/${userId}`,
    {
      headers: { "Authorization": token },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Alert.alert(
        "Error getting user!!",
        error.response.data.errors[0].message,
        [{ text: "OK" }],
        { cancelable: true }
      )
    });
};

module.exports = {
  getUserInfo
};