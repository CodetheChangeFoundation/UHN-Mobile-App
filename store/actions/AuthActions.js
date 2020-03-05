import * as axios from 'axios';
import { LOGIN, LOGIN_FAILED, SIGNUP_FAILED, SET_LOADING } from "./Types"
import { setStatus } from '../../store/actions/UserDataActions.js'
import { SERVER_ROOT } from 'react-native-dotenv';
import { Actions } from "react-native-router-flux";
import { AsyncStorage, Alert } from "react-native";
import { sendPushToken } from "../../services/push-token.service";

const login = (data, rememberMe) => {
  console.log(data);
  return {
    type: LOGIN,
    data: { userId: data.id, token: data.token, rememberMe: rememberMe }
  };
}

const loginFailed = (error) => {
  console.log("login failed:", error);
  Alert.alert(
    "Login failed!",
    error.response.data.errors[0].message
    + "! Please check that you've entered each field correctly.",
    [{ text: "OK" }],
    { cancelable: true }
  )
  return {
    type: LOGIN_FAILED
  }
}

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    data: { loading: isLoading }
  }
}

const signupFailed = (error) => {
  console.log("signup failed: ", error);
  Alert.alert(
    "Signup failed!",
    error.response.data.errors[0].message
    + "! Please check that you've entered each field correctly.",
    [{ text: "OK" }],
    { cancelable: true }
  )
  return {
    type: SIGNUP_FAILED
  }
}

export const tokenRedirect = (userid, token, rememberMe) => {
  return async (dispatch) => {
    dispatch(login({ id: userid, token: token }, rememberMe))
    sendPushToken(userid);
  }
}

export const loginHandler = (credential, rememberMe) => {
  console.log('http://' + SERVER_ROOT + '/login')
  return (dispatch) => {
    axios.post(SERVER_ROOT + '/login', credential)
      .then(async (response) => {
        dispatch(setLoading(false));
        dispatch(login(response.data, rememberMe));
        dispatch(setStatus(response.data.id, response.data.token, { "naloxoneAvailability": response.data.naloxoneAvailability }))
        sendPushToken(response.data.id);
        await AsyncStorage.setItem("token", response.data.token);
        Actions.main();
      })
      .catch(error => {
        dispatch(setLoading(false));
        dispatch(loginFailed(error));
      })
  }
}

export const signupHandler = (userData) => {
  return (dispatch) => {
    axios.post(SERVER_ROOT + '/signup', userData)
      .then(response => {
        dispatch(setLoading(false));
        Actions.login();
      })
      .catch(error => {
        dispatch(setLoading(false));
        dispatch(signupFailed(error));
      })
  }
}


