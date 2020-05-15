import { SET_MY_RESPONDERS, RESPONDERS_ERROR } from "../actions/Types"

const initialState = {
  myResponders: [],
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_RESPONDERS:
      return { ...state, myResponders: action.data.myResponders, error: "" };
    case RESPONDERS_ERROR:
      return { ...state, error: action.data.error.toString() };
    default:
      return state;
  }
}