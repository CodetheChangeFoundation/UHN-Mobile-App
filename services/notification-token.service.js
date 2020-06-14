import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";

const sendNotificationToken = async userId => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== "granted") {
    alert("Please allow permissions for notifications");
    return;
  }

  let token = "";
  try {
    token = await Notifications.getExpoPushTokenAsync();
    console.log("push token: ", token);
  } catch (err) {
    console.log("no push token received");
  }

  return axios
    .post(SERVER_ROOT + "/users/" + userId + "/notification-token", {
      pushToken: token
    })
    .then(response => {
      return response;
    })
    .catch(err => console.error(err));
};

// TODO: Consider a DELETE endpoint
const removeNotificationToken = async userId => {
  return axios
    .post(SERVER_ROOT + "/users/" + userId + "/notification-token", {
      pushToken: null
    })
    .then(response => {
      return response;
    })
    .catch(err => console.error(err));
};

module.exports = {
  sendNotificationToken,
  removeNotificationToken
};
