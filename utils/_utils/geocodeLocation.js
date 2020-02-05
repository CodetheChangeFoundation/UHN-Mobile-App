import * as Location from "expo-location";
import { Alert } from 'react-native'

export const convertToCoordinates = (address, success) => {

    Location.geocodeAsync(address)
    .then((results) => {
        if( !results[0] ) {
            console.log('nope')
            Alert.alert(
                'Address not found!',
                'Please check for spelling errors, or enter address in more detail!',
                [
                  { text: 'OK' },
                  { text: 'Cancel', style: 'cancel' }
                ],
                {cancelable: false},
            )
            return null
        }
        else {
            console.log('heck')
            const coordinates = { lat: results[0].latitude, lng: results[0].longitude }
    
            // accepts a success callback, otherwise just returns the value
            if(success) success(coordinates)
            return coordinates
        }
    })
    .catch((error) => {
        console.error('cannot geocode address!', {error})
    })
}

export const convertToAddress = (coordinates, success) => {

    let coords = {coordinates}
    if (coordinates && coordinates.lat || coordinates.lng) {
        coords = { latitude: coordinates.lat, longitude: coordinates.lng }
    }
    else coords = { latitude: coordinates.latitude, longitude: coordinates.longitude }

    Location.reverseGeocodeAsync(coords)
    .then((results) => {
        // street, name, city, region, country, postalCode, name
        const { name, street, city, country } = results[0]
        let address = `${name}, ${street}, ${city}, ${country}`
        if (name.includes(street)) address = `${name}, ${city}, ${country}`

        // accepts a success callback, otherwise just returns the value
        if(success) success(address)
        return address
    })
    .catch((error) => {
        console.error('cannot reverse geocode coordinates!', {error})
    })
}