import { GET_MY_RESPONDERS } from "../actions/Types"

const initialState = {
  myResponders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_RESPONDERS:
      return { ...state, myResponders: action.data.myResponders };
    default:
      return state;
  }
}