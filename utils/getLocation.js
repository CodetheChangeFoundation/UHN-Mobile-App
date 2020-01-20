import { Platform } from 'react-native'
import * as Location from 'expo-location';

export default function getLocation(success) {
    Location.requestPermissionsAsync()
    .then(() => {
        Location.getCurrentPositionAsync()
        .then((location) => {
            success(location.coords)
        })
        .catch((error) => {
            console.error('cannot get location!', {error})
        })
    })
    .catch((error) => {
        console.error('location services disabled!', {error})
    })
}