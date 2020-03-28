import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';
import { Actions } from "react-native-router-flux";

const locationsError = (error) => {
    Actions.alert({
        alertTitle: "Location request failed!",
        alertBody: error.response?.data?.errors[0]?.message || '',
        positiveButton: { text: "OK" },
        cancelable: true
      });
}

const getUserInfo = async (userId, token) => {
  return axios.get(`${SERVER_ROOT}/users/${userId}`,
    {
      headers: { "Authorization": token },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Actions.alert({
        alertTitle: "Error getting user!!",
        alertBody: error.response?.data?.errors[0]?.message || '',
        positiveButton: { text: "OK" },
        cancelable: true
      });
    });
};

// GET Request from db, returns promise
// response --> location: { coords: { lat, lng }, note }
const getUserLocation = (payload) => {
    const accessToken = {
        headers: { 'x-access-token': 'Bearer ' + payload.token }
    }

    return (
        axios.get(SERVER_ROOT + '/users/' + payload.id + '/location', accessToken)
        .then(response => { return response.data })
        .catch(error => { locationsError(error) })
    )
}

// PUT Request to db, returns promise
// payload --> location: { coords: { lat, lng }, note }
const updateUserLocation = (payload) => {

    const config = {
        headers: { 'x-access-token': 'Bearer ' + payload.token }
    }
    
    return (
      axios.put(SERVER_ROOT + '/users/' + payload.id + '/location', payload.data, config)
        .then(response => { return response.data })
        .catch(error => { locationsError(error) })
    )
}

const getWatchingFor = async (userId, token) => {
  return axios.get(`${SERVER_ROOT}/users/${userId}/responding-to`,
    {
      headers: { "Authorization": token },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {userInfoError(error)});
}

module.exports = {
    getUserInfo,
    getUserLocation,
    getWatchingFor,
    updateUserLocation
}