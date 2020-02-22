import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";

const sendHelpRequest = async (userId, token) => {
    return axios
      .post(SERVER_ROOT + "/help-requests", { userId }, {
        headers: { "Authorization": token },
      })
      .then(response => {
        return response;
      })
      .catch(err => console.error(err));
};
  
module.exports = {
  sendHelpRequest
};