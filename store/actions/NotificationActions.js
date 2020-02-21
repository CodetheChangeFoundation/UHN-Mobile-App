import { SET_NOTIFICATION } from "./Types";

export const setNotification = (notification) => {
  return {
    type: SET_NOTIFICATION,
    data: {
      notification
    }
  };
}

// export const receiveNotification = (notification) => {
//   return (dispatch) => {
//     dispatch(setNotification(notification));
//   }
// }
