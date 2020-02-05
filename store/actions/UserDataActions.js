import { SET_LOCATION } from "./Types"

export const setLocalLocation = (location) => {
  return {
    type: SET_LOCATION,
    data: {location: location}
  };
}