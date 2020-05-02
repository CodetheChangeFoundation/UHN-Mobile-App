import { SET_RESPONSELOG_ID } from "../../actions/Types";

const initialState = {
    currentResponseLog: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESPONSELOG_ID:
      return { ...state, currentResponseLog: action.data };
    default:
      return state;
  }
}