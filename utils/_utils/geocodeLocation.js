import * as Location from "expo-location";

export const convertToCoordinates = (address, success) => {

    Location.geocodeAsync(address)
    .then((results) => {
        const coordinates = { lat: results[0].latitude, lng: results[0].longitude }

        // accepts a success callback, otherwise just returns the value
        if(success) success(coordinates)
        return coordinates
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
        const address = `${name} ${street}, ${city}, ${country}`

        // accepts a success callback, otherwise just returns the value
        if(success) success(address)
        return address
    })
    .catch((error) => {
        console.error('cannot reverse geocode coordinates!', {error})
    })
}