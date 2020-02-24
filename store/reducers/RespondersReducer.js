import { SET_MY_RESPONDERS, RESPONDERS_ERROR, SET_LOADING } from "../actions/Types"

const initialState = {
  myResponders: [],
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_RESPONDERS:
      console.log(action.data.myResponders);
      return { ...state, myResponders: action.data.myResponders, error: "" };
    case RESPONDERS_ERROR:
      return { ...state, error: action.data.error.toString() };
    default:
      return state;
  }
}