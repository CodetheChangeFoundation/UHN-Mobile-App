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

const addResponderToHelpRequest = (userId, token, helpRequestId) => {
  return axios
    .put(`${SERVER_ROOT}/help-requests/${helpRequestId}`,
      {
        newResponderId: userId,
        status: "taken"
      },
      {
        headers: { "Authorization": token }
      }
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err)
      if (err.response) {
        // console.log("error response:", err.response)
        if ((err.response.status == 400) && (err.response.data.statusCode == 400200)) {
          return err.response;
        }
      } else {
        console.error(err);
      }
    });
}
  
module.exports = {
  sendHelpRequest,
  addResponderToHelpRequest
};