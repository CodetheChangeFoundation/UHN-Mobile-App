import { INCREMENT_TIMER, DECREMENT_TIMER, COUNTDOWN, CLEARTIME, RESETTIME } from "../actions/Types"

const initialState = {
  time: 120,
  timeRemaining: 120
};

export default (state = initialState, action) => {
  switch(action.type){
    case INCREMENT_TIMER:
      return action.data;
    case DECREMENT_TIMER:
      return action.data;
    case COUNTDOWN:
      return {...state, timeRemaining: action.data};
    case CLEARTIME:
      return {...state, timeRemaining: 0};
    case RESETTIME:
      return initialState;
    default:
      return state;  
  }
}