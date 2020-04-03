import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { Actions } from "react-native-router-flux";
import jwtDecode from "jwt-decode";

import * as LocalStorageService from "./localStorage.service";

export const setupInterceptors = () => {
  // axios.interceptors.request.use(
  //   config => {
  //     console.log("interceptor request");
  //     LocalStorageService.getAccessToken().then(token => {
  //       if (token) {
  //         config.headers["Authorization"] = "Bearer " + token;
  //       }
  //       config.headers["Content-Type"] = "application/json";
  //       return config;
  //     });
  //   },
  //   error => {
  //     Promise.reject(error);
  //   }
  // );
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status != 401) {
        Promise.reject(error);
      }

      console.log("error config", error.config.headers["Authorization"]);
      let userId = jwtDecode(error.config.headers["Authorization"], { complete: true }).id

      if (error.config.url == `${SERVER_ROOT}/refresh-token`) {
        Actions.auth();
        return Promise.reject(error);
      }

      return LocalStorageService.getNewAccessToken(userId)
        .then(newAccessToken => {
          const config = error.config;
          console.log("config: ", config);
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return new Promise((res, rej) => {
            axios
              .request(config)
              .then(response => {
                res(response);
              })
              .catch(error => {
                rej(error);
              });
          });
        })
        .catch(error => {
          Promise.reject(error);
        });
    }
  );
};
