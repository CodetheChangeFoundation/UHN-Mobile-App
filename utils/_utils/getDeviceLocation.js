import * as Location from 'expo-location';

export const getDeviceLocation = (success) => {
    Location.requestPermissionsAsync()
    .then(() => {
        Location.getCurrentPositionAsync()
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
        console.error('location services disabled!', {error})
    })
}