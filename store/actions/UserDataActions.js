import { SET_LOCATION } from "./Types"

export const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    data: {location: location}
  };
}