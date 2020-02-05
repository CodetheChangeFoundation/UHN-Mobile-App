import { SET_LOCATION } from "../actions/Types"

/**
 * TODO: save both "userLocation" and "deviceLastLocation" for emergency purposes
 * deviceLastLocation might need to be updated at intervals
 * (need to be decided when or how often if running in the back)
 */

const initialState = {
  location: {
        lat: 0,
        lng: 0,
        note: ''
  }
};

export default (state = initialState, action) => {
  switch(action.type){
    case SET_LOCATION:
      return {...state, location: action.data.location};
    default:
      return state;  
  }
}