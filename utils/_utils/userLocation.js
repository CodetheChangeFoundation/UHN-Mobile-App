import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';

// GET Request from db, returns promise
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

// POST Request to db, returns promise
export const updateUserLocation = (payload) => {

    const config = {
        headers: { 'x-access-token': 'Bearer ' + payload.token }
    }
    
    return (
      axios.post(SERVER_ROOT + '/users/' + payload.id + '/location', payload.data, config)
        .then(response => { return response.data })
        .catch(error => { console.error(error) })
    )
}