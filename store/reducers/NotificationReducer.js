import { SET_NOTIFICATION } from "../actions/Types";

const initialState = {
  notification: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return { ...state, notification: action.data.notification };
    default:
      return state;
  }
}