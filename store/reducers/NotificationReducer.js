import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../actions/Types";

const initialState = {
  notificationQueue: [],     // Items are queued to end of array & dequeued from the beginning (index 0)
  notificationCount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { 
        ...state, 
        notificationQueue: [...state.notificationQueue, action.data.notification],
        notificationCount: state.notificationCount + 1
      };
    case REMOVE_NOTIFICATION:
      let newNotificationQueue = state.notificationQueue;
      newNotificationQueue.shift();
      return { 
        ...state, 
        notificationQueue: newNotificationQueue,
        notificationCount: state.notificationCount - 1
      };
    default:
      return state;
  }
}