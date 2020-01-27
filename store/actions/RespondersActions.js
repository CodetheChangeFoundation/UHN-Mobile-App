import { GET_MY_RESPONDERS } from "./Types"

// fake data
const fakeResponders = [
  { username: "alpha", available: true },
  { username: "bravo", available: false },
  { username: "charlie", available: false },
  { username: "delta", available: true },
  { username: "echo", available: false },
  { username: "foxtrot", available: false },
  { username: "georgia", available: false },
  { username: "hotel", available: true },
  { username: "india", available: true },
  { username: "juliet", available: false },
  { username: "kilo", available: false },
  { username: "lima", available: false },
  { username: "mike", available: false },
];

export const getMyResponders = () => {
  // TODO: fetch list of responders (username + availability) for this user
  const myResponders = fakeResponders;
  return {
    type: GET_MY_RESPONDERS,
    data: {
      myResponders
    }
  };
}
