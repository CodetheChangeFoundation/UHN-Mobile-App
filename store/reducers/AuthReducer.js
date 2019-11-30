import { LOGIN, SET_LOADING } from "../actions/Types"

const initialState = {
  userId: "",
  token: "",
  rememberMe: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { userId: action.data.userId, token: action.data.token, rememberMe: action.data.rememberMe};
    case SET_LOADING:
      return {...state, loading: action.data.loading}
    default:
      return state;
  }
}