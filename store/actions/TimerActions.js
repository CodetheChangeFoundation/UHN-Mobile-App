import { INCREMENT_TIMER, DECREMENT_TIMER, COUNTDOWN, CLEARTIME, RESETTIME } from "./Types"

export const increaseTime = (time) => {
  return {
    type: INCREMENT_TIMER,
    data: {time: time + 15, timeRemaining: time + 15}
  };
}

export const decreaseTime = (time) => {
  return {
    type: DECREMENT_TIMER,
    data: {time: time - 15, timeRemaining: time - 15}
  };
}

export const countdown = (time) => {
  return {
    type: COUNTDOWN,
    data: time - 1
  }
}

export const clearTime = () => {
  return {
    type: CLEARTIME
  }
}

export const resetTime = () => {
  return {
    type: RESETTIME,
  }
}