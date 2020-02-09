import { SET_MY_RESPONDERS, ADD_RESPONDERS, REMOVE_RESPONDERS } from "../actions/Types"

const initialState = {
  myResponders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_RESPONDERS:
      return { ...state, myResponders: action.data.myResponders };
    default:
      return state;
  }
}