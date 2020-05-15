import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { Actions } from "react-native-router-flux";
import jwtDecode from "jwt-decode";

import * as TokenService from "./token.service";
import { store } from "../store/store";
import { SET_NEW_ACCESS_TOKEN } from "../store/actions/Types";

const setNewAccessToken = (token) => {
  return {
    type: SET_NEW_ACCESS_TOKEN,
    data: {
      token: token
    }
  }
}

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
              .then(async (response) => {
                store.dispatch(setNewAccessToken(newAccessToken))
                await TokenService.setAccessToken(newAccessToken);
                res(response);
              })
              .catch(error => {
                Actions.auth();
                rej(error);
              });
          });
        })
        .catch(error => {
          Actions.auth();
          Promise.reject(error);
        });
    }
  );
};