import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./Types";
import { Actions } from "react-native-router-flux";

const openHelpRequestModal = () => {
  // TODO: To render modal, need to dismiss any other modals currently on screen
  Actions.responderHelpRequestModal();
}

const addNotification = (notification) => (dispatch) => {
  dispatch({
    type: ADD_NOTIFICATION,
    data: {
      notification
    }
  });
  return Promise.resolve();
}

export const receiveNotification = (notificationState, notification) => {
  return (dispatch) => {
    const notificationQueueIsEmpty = (notificationState.notificationQueue.length == 0);
    dispatch(addNotification(notification))
      .then(() => {
        // Show modal if there are no other help requests in progress
        if (notificationQueueIsEmpty) {
          openHelpRequestModal();
        }
      })
  }
}

const removeNotification = () => (dispatch) => {
  dispatch({
    type: REMOVE_NOTIFICATION
  });
  return Promise.resolve();
}

export const dismissNotification = (notificationState) => {
  return (dispatch) => {
    dispatch(removeNotification())
      .then(() => {
        // If there is another notification waiting in the queue, show it
        if (notificationState.notificationQueue.length > 0) {
          openHelpRequestModal();
        }
      });
  }
}
