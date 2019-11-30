import * as axios from 'axios';
import { LOGIN, SIGNUP, SET_LOADING } from "./Types"
import { SERVER_ROOT } from 'react-native-dotenv';
import { Actions } from "react-native-router-flux";


const login = (data, rememberMe) => {
  console.log(data);
  return {
    type: LOGIN,
    data: {userId: data.id, token: data.token, rememberMe: rememberMe}
  };
}

const loginFailed = (error) => {
  console.log("login failed: ");
  console.log(error);
}

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    data: {loading: isLoading}
  }
}

const signupFailed = (error) => {
  console.log("signup failed: ");
  console.log(error);
}

export const longinHandler = (credential, rememberMe) => {
  return(dispatch) => {
    axios.post(SERVER_ROOT + '/login', credential)
    .then(response => {
      dispatch(setLoading(false));
      dispatch(login(response.data, rememberMe));
      Actions.main();
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(loginFailed(error));
    })
  }
}

export const signupHandler = (userData) => {
  return(dispatch) => {
    axios.post(SERVER_ROOT + '/signup', userData)
    .then(response => {
      dispatch(setLoading(false));
      console.log(response.data);
      Actions.login();
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(signupFailed(error));
    })
  }



  axios.post(SERVER_ROOT + '/signup', {
    email: email,
    phone: phoneNumber,
    username: username,
    password: password,
  }).then(this.onSignUpSuccess)
    .catch(this.onSignUpFailed);
}


