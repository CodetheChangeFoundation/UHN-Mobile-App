import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { Actions } from "react-native-router-flux";

import * as LocalStorageService from "./localStorage.service";

var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    console.log("interceptor request")
    LocalStorageService.getAccessToken().then(token => {
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      config.headers["Content-Type"] = "application/json";
      return config;
    });
  },
  error => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === `${SERVER_ROOT}/refresh-token`) {
      Actions.auth();
      return Promise.reject(error);
    }

    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("originalRequest: ", originalRequest);
      let refreshToken = await LocalStorageService.getRefreshToken();
      return axiosInstance
        .post(SERVER_ROOT + "/refresh-token", { refreshToken: refreshToken })
        .then(async response => {
          if (response.status == 200) {
            LocalStorageService.setAccessToken(response.data.token);
            axiosInstance.defaults.headers.common["Authorization"] =
              "Bearer " + LocalStorageService.getAccessToken();
            return axiosInstance(originalRequest);
          }
        })
        .catch(error => {
          dispatch(refreshTokenFailed(error));
        });
    }

    console.log("axios instance error: ", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
