import * as Location from "expo-location";
import { Alert } from 'react-native'

/**
 * Both have the same pattern:
 * 1) Do conversion
 * 2) If success, call success function
 * 3) If fail, call fail function
 */

export const convertToCoordinates = (address, success, fail) => {

    Location.geocodeAsync(address)
    .then((results) => {
        if( !results[0] ) {
            Alert.alert(
                'Address not found!',
                'Please check for spelling errors, or enter address in more detail!',
                [{ text: 'OK' }],
                {cancelable: false},
            )
            fail && fail(null)
        }
        else {
            const coordinates = { lat: results[0].latitude, lng: results[0].longitude }
    
            // accepts a success callback, otherwise just returns the value
            success && success(coordinates)
        }
    })
    .catch((error) => {
        console.error('cannot geocode address!', {error})
    })
}

export const convertToAddress = (coordinates, success, fail) => {

    let coords = {coordinates}
    if (coordinates && coordinates.lat || coordinates.lng) {
        coords = { latitude: coordinates.lat, longitude: coordinates.lng }
    }
    else coords = { latitude: coordinates.latitude, longitude: coordinates.longitude }

    Location.reverseGeocodeAsync(coords)
    .then((results) => {
        if(!results[0]) {
            Alert.alert(
                'Coordinates could not be read!',
                'Please check your coordinates!',
                [{ text: 'OK' }],
                {cancelable: false},
            )
            fail && fail(null)
        } else {
            // street, name, city, region, country, postalCode, name
            const { name, street, city, country } = results[0]
            let address = `${name} ${street}, ${city}`
            if (name.includes(street)) address = `${name}, ${city}`
    
            // accepts a success callback, otherwise just returns the value
            success && success(address)
        }
    })
    .catch((error) => {
        console.error('cannot reverse geocode coordinates!', {error})
    })
}