import * as Location from 'expo-location';

export const getDeviceLocation = (success) => {
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