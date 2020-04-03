import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';
import { Actions } from "react-native-router-flux";

const locationsError = (error) => {
    console.error(error)
    Actions.alert({
        alertTitle: "Location request failed!",
        alertBody: error.response?.data?.errors[0]?.message || '',
        positiveButton: { text: "OK" },
        cancelable: true
      });
}

// GET Request from db, returns promise
// response --> location: { coords: { lat, lng }, note }
export const getUserLocation = (payload) => {
    const accessToken = {
        headers: { 'Authorization': 'Bearer ' + payload.token }
    }

    return (
        axios.get(SERVER_ROOT + '/users/' + payload.id + '/location', accessToken)
        .then(response => { return response.data })
        .catch(error => { locationsError(error) })
    )
}

// PUT Request to db, returns promise
// payload --> location: { coords: { lat, lng }, note }
export const updateUserLocation = (payload) => {

    const config = {
        headers: { 'Authorization': 'Bearer ' + payload.token }
    }
    
    return (
      axios.put(SERVER_ROOT + '/users/' + payload.id + '/location', payload.data, config)
        .then(response => { return response.data })
        .catch(error => { locationsError(error) })
    )
}