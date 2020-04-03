import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { Actions } from "react-native-router-flux";
import jwtDecode from "jwt-decode";

import * as TokenService from "./token.service";

export const setupInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status != 401) {
        Promise.reject(error);
      }

      let userId = jwtDecode(error.config.headers["Authorization"], { complete: true }).id;

      if (error.config.url == `${SERVER_ROOT}/refresh-token`) {
        Actions.auth();
        return Promise.reject(error);
      }

      return TokenService.getNewAccessToken(userId)
        .then(newAccessToken => {
          const config = error.config;
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
