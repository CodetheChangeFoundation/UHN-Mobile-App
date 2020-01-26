import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';

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