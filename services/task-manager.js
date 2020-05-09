import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { updateUserLocation } from "../utils";
import { setLocalLocation } from "../store/actions";
import * as TaskNames from "../constants/taskNames";
import { store } from "../store/store";

const locationTaskHandler = async (locations) => {
  const mostRecentLocation = locations[locations.length - 1];

  const location = {
    coords: {
      lat: mostRecentLocation.coords.latitude,
      lng: mostRecentLocation.coords.longitude,
    },
    note: store.getState().userData.location.note
  };
  console.log("Task manager received new location:", location);

  // If logged in, update location
  const { userId: id, token } = store.getState().auth;
  if (!!id && !!token ) {
    // Redux
    store.dispatch(setLocalLocation(location));
    // DB
    await updateUserLocation({ id, token, data: location });
  }
}

export const registerLocationTask = () => {
  console.log("registering location task")
  TaskManager.defineTask(TaskNames.LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.error(error.message);
      return;
    }
    if (data) {
      const { locations } = data;
      try {
        locationTaskHandler(locations);
      } catch (err) {
        console.log(err);
      }
    }
  });
}

export const startLocationTask = () => {
  console.log("starting location task")
  return Location.startLocationUpdatesAsync(TaskNames.LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    distanceInterval: 50     // Receive updates only when the location has changed by at least this distance in meters
    // timeInterval: 10*1000     // More useful for testing -- Minimum time to wait between each update in milliseconds (Android only)
  })
    // On iOS, the Expo client does not include TaskManager and will throw an error.
    // TODO: iOS requires a custom Expo client https://docs.expo.io/guides/adhoc-builds/ 
    .catch((err) => console.error(err));
}

export const stopLocationTask = () => {
  return Location.stopLocationUpdatesAsync(TaskNames.LOCATION_TASK_NAME);
}
