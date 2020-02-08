import { GET_MY_RESPONDERS, ADD_RESPONDERS, REMOVE_RESPONDERS } from "./Types"

// fake data
const fakeResponders = [
  { username: "alpha", available: true },
  { username: "bravo", available: false },
  { username: "charlie", available: false },
  { username: "delta", available: true },
  { username: "echo", available: false },
  { username: "foxtrot", available: false },
  { username: "golf", available: false },
  { username: "hotel", available: true },
  { username: "india", available: true },
  { username: "juliet", available: false },
  { username: "kilo", available: false },
  { username: "lima", available: false },
  { username: "mike", available: false },
];

const getFakeResponse = (usernamesToAdd) => {
  let addedResponders = [];
  for (username of usernamesToAdd) {
    addedResponders.push({username: username, available: username.includes('a')});
  }
  return addedResponders;
}

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

export const removeResponders = (usernamesToRemove, myResponders) => {
  // TODO: ping backend to remove usernames in usernamesToRemove from this user's profile

  let respondersToKeep = [];
  for (responder of myResponders) {
    if (!usernamesToRemove.includes(responder.username)) {
      respondersToKeep.push(responder);
    }
  }

  return {
    type: REMOVE_RESPONDERS,
    data: {
      myResponders: respondersToKeep
    }
  }
}

export const addResponders = (usernamesToAdd, myResponders) => {
  // TODO: ping backend to add usernames in usernamesToAdd to this user's profile
  // Should receive a response containing the users we just added (username + availability).
  // Store that response in addedResponders and delete getFakeResponse
  const addedResponders = getFakeResponse(usernamesToAdd);

  return {
    type: ADD_RESPONDERS,
    data: {
      myResponders: [...myResponders, ...addedResponders]
    }
  }
}
