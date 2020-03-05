import * as Location from 'expo-location';
import { Alert } from 'react-native'

const getDeviceLocation = (success) => {
    Location.requestPermissionsAsync()
    .then(() => {
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
        .then((location) => {
            const coordinates = { lat: location.coords.latitude, lng: location.coords.longitude }

            if (success) success(coordinates)
            return coordinates
        })
        .catch((error) => {
            console.error('cannot get location!', {error})
        })
    })
    .catch((error) => {
        alert("Please allow location services");
    })
}


const toRad = (angle) => {
    return (angle * Math.PI) / 180;
}

// Haversine Formula to compute distance in meters
const computeDistance = (locationOne, locationTwo) => {
    const { lat:lat1, lng:lng1 } = locationOne
    const { lat:lat2, lng:lng2 } = locationTwo
    const lat1InRad = toRad(lat1);
    const lng1InRad = toRad(lng1);
    const lat2InRad = toRad(lat2);
    const lng2InRad = toRad(lng2);
  
    return (
      // In meters
      6377830.272 *
      Math.acos(
        Math.sin(lat1InRad) * Math.sin(lat2InRad) +
          Math.cos(lat1InRad) * Math.cos(lat2InRad) * Math.cos(lng2InRad - lng1InRad),
      )
    );
}

/**
 * Both have the same pattern:
 * 1) Do conversion
 * 2) If success, call success function
 * 3) If fail, call fail function
 */

const convertToCoordinates = (address, success, fail) => {

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

const convertToAddress = (coordinates, success, fail) => {

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

module.exports = {
    getDeviceLocation,
    computeDistance,
    convertToAddress,
    convertToCoordinates
}