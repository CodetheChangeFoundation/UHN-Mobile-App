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
    .catch((err) => console.error(err));
};

module.exports = {
  getUserInfo
};