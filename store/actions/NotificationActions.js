import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./Types";
import { Actions } from "react-native-router-flux";

const openHelpRequestModal = () => {
  // TODO: the modal will not show if there is currently an Alert showing onscreen.
  
  // To render modal, need to dismiss any other modals currently on screen
  if ((Actions.currentScene == "modal")) {
    Actions.pop()
  }
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

    if ((Actions.currentScene == "responderHelpRequestModal")) {
      Actions.pop()     // Dismiss responderHelpRequestModal in case we need to re-render it below
    }

    dispatch(removeNotification());
    // If there was another notification waiting in the queue, show it
    if (notificationCount > 1) {
      openHelpRequestModal();
    }
  }
}
