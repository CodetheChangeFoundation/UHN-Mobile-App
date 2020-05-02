import * as axios from "axios";
import { LOGIN, LOGIN_FAILED, SIGNUP_FAILED, SET_LOADING, REFRESH_TOKEN_FAILED } from "./Types";
import { setStatus } from "../../store/actions/UserDataActions.js";
import { SERVER_ROOT } from "react-native-dotenv";
import { Actions } from "react-native-router-flux";
import { sendNotificationToken } from "../../services/notification-token.service";
import * as TokenService from "../../services/token.service";

const login = (data, rememberMe) => {
  console.log("in login dispatch")
  return {
    type: LOGIN,
    data: {
      userId: data.id,
      token: data.token,
      refreshToken: data.refreshToken,
      rememberMe: rememberMe
    }
  };
};

const loginFailed = (error) => {
  console.log("login failed:", error);
  Actions.alert({
    alertTitle: "Login failed!",
    alertBody: (error.response?.data?.errors[0]?.message || '')
    + "\nPlease check that you've entered each field correctly.",
    positiveButton: { text: "OK" },
    cancelable: true 
  });
  return {
    type: LOGIN_FAILED
  };
};

export const setLoading = isLoading => {
  return {
    type: SET_LOADING,
    data: { loading: isLoading }
  };
};

const signupFailed = (error) => {
  console.log("signup failed: ", error);
  Actions.alert({
    alertTitle: "Signup failed!",
    alertBody: (error.response?.data?.errors[0]?.message || '')
    + "\nPlease check that you've entered each field correctly.",
    positiveButton: { text: "OK" },
    cancelable: true
  });
  return {
    type: SIGNUP_FAILED
  };
};

export const tokenRedirect = (userid, token, rememberMe) => {
  return async dispatch => {
    dispatch(login({ id: userid, token: token }, rememberMe));
    sendNotificationToken(userid);
  };
};

export const loginHandler = (credential, rememberMe) => {
  console.log('http://' + SERVER_ROOT + '/login')
  return (dispatch) => {
    axios.post(SERVER_ROOT + '/login', credential)
      .then(async (response) => {
        if (response.data.metricError) {
          console.log("Metric Error:", response.data.metricError);
        }
        dispatch(setLoading(false));
        dispatch(login(response.data, rememberMe));
        dispatch(
          setStatus(response.data.id, response.data.token, {
            naloxoneAvailability: response.data.naloxoneAvailability
          })
        );
        sendNotificationToken(response.data.id);
        await TokenService.setAccessToken(response.data.token);
        await TokenService.setRefreshToken(response.data.refreshToken);
        Actions.main();
      })
      .catch(error => {
        console.log("loginHandler error: ", error.message);
        dispatch(setLoading(false));
        dispatch(loginFailed(error));
      });
  };
};

export const signupHandler = userData => {
  return dispatch => {
    axios
      .post(SERVER_ROOT + "/signup", userData)
      .then(response => {
        if (response.data.metricError) {
          console.log("Metric Error:", response.data.metricError);
        }
        dispatch(setLoading(false));
        Actions.login();
      })
      .catch(error => {
        dispatch(setLoading(false));
        dispatch(signupFailed(error));
      });
  };
};
