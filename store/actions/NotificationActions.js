import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./Types";
import { Actions } from "react-native-router-flux";

const openHelpRequestModal = () => {
    // TODO: To render modal, need to dismiss any other modals currently on screen
    setTimeout(() => Actions.responderHelpRequestModal(), 1);
}


const addNotification = (notification) => {
  return {
    type: ADD_NOTIFICATION,
    data: {
      notification
    }
  };
}

export const receiveNotification = (notification) => {
  return (dispatch, getState) => {
    const { notification: {notificationQueue, notificationCount} } = getState();
    console.log("adding notif. queue now has", notificationCount + 1)
    dispatch(addNotification(notification));
    // Show modal if there are no other help requests in progress
    if (notificationCount == 0) {
      openHelpRequestModal();
    }
  }
}


const removeNotification = () => {
   return {
    type: REMOVE_NOTIFICATION
  };
}

export const dismissNotification = () => {
  return (dispatch, getState) => {
    const { notification: {notificationQueue, notificationCount} } = getState();
    console.log("dismissing notif. queue now has", notificationCount - 1)

    if ((Actions.currentScene == "responderHelpRequestModal")) {
      Actions.pop()
    } else {
      Actions.main();
    }

    dispatch(removeNotification());
    // If there was another notification waiting in the queue, show it
    if (notificationCount > 1) {
      openHelpRequestModal();
    }
  }
}
