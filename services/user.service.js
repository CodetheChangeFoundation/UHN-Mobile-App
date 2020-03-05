import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';

const getUserInfo = async (userId, token) => {
  return axios.get(`${SERVER_ROOT}/users/${userId}`,
    {
      headers: { "Authorization": token },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
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
        .catch(error => { console.error(error) })
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
        .catch(error => { console.error(error) })
    )
}

module.exports = {
    getUserInfo,
    getUserLocation,
    updateUserLocation
}