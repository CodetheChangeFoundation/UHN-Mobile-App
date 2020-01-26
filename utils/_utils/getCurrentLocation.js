import * as Location from 'expo-location';

export const getCurrentLocation = (success) => {
    Location.requestPermissionsAsync()
    .then(() => {
        Location.getCurrentPositionAsync()
        .then((location) => {
            if (success) success(location.coords)
            return location.coords
        })
        .catch((error) => {
            console.error('cannot get location!', {error})
        })
    })
    .catch((error) => {
        console.error('location services disabled!', {error})
    })
}