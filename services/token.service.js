import { AsyncStorage } from "react-native";
import axios from "axios";

import { SERVER_ROOT } from "react-native-dotenv";

const REFRESH_TOKEN_KEY = "refreshToken";
const ACCESS_TOKEN_KEY = "token";

export const setAccessToken = accessToken => {
  return new Promise(async (res, rej) => {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    res();
  });
};

export const setRefreshToken = refreshToken => {
  return new Promise(async (res, rej) => {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    res();
  });
};

export const getAccessToken = () => {
  return new Promise(async (res, rej) => {
    let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    res(accessToken);
  });
};

export const getRefreshToken = async () => {
  return new Promise(async (res, rej) => {
    let refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    res(refreshToken);
  });
};

export const getNewAccessToken = async userId => {
  return new Promise(async (res, rej) => {
    let refreshToken = await getRefreshToken();
    axios
      .post(SERVER_ROOT + "/refresh-token", {
        refreshToken: refreshToken,
        userId: userId
      })
      .then(response => {
        setAccessToken(response.data.token);
        setRefreshToken(response.data.refreshToken);

        res(response.data.token);
      })
      .catch(error => {
        rej(error);
      });
  });
};

export const clearToken = async () => {
  return new Promise(async (res, rej) => {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    res();
  });
};
