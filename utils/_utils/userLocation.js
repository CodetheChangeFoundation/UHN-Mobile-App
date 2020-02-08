import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';

// GET Request from db, returns promise
// response --> location: { coords: { lat, lng }, note }
export const getUserLocation = (payload) => {
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
export const updateUserLocation = (payload) => {

    const config = {
        headers: { 'x-access-token': 'Bearer ' + payload.token }
    }
    
    return (
      axios.put(SERVER_ROOT + '/users/' + payload.id + '/location', payload.data, config)
        .then(response => { return response.data })
        .catch(error => { console.error(error) })
    )
}