import * as Location from 'expo-location';
import { Actions } from "react-native-router-flux";

export const promptLocationPermissions = async () => {
    Location.requestPermissionsAsync()
    .then(() => { console.log("User permissions enabled!")})
    .catch((error)  => {
        Actions.alert({
            alertTitle: "Please allow location services!",
            alertBody: (error.response?.data?.errors[0]?.message || ''),
            positiveButton: { text: "OK" },
            cancelable: true 
        });
    })
}

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
            Actions.alert({
                alertTitle: "Cannot get location!",
                alertBody: (error.response?.data?.errors[0]?.message || ''),
                positiveButton: { text: "OK" },
                cancelable: true 
            });
        })
    })
    .catch((error) => {
        Actions.alert({
            alertTitle: "Please allow location services!",
            alertBody: (error.response?.data?.errors[0]?.message || ''),
            positiveButton: { text: "OK" },
            cancelable: true 
        });
    })
}