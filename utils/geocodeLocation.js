import * as Location from "expo-location";

export const convertToCoordinates = (address, success) => {
    Location.geocodeAsync(address)
    .then((results) => {
        success(results[0])
    })
    .catch((error) => {
        console.error('cannot geocode address!', {error})
    })
}

export const convertToAddress = (coordinates, success) => {
    Location.reverseGeocodeAsync(coordinates)
    .then((results) => {
        console.log(results)
    })
    .catch((error) => {
        console.error('cannot reverse geocode coordinates!', {error})
    })
}