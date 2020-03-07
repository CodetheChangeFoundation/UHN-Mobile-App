import { AsyncStorage } from "react-native";

const REFRESH_TOKEN_KEY = "refreshToken";
const ACCESS_TOKEN_KEY = "token";

export const setAccessToken = (accessToken) => {
  return new Promise(async (res, rej) => {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    res();
  });
};

export const setRefreshToken = (refreshToken) => {
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

export const clearToken = async () => {
  return new Promise(async (res, rej) => {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    res();
  });
};
