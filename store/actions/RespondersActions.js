import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';
import { SET_MY_RESPONDERS, ADD_RESPONDERS, REMOVE_RESPONDERS } from "./Types"
import { Actions } from 'react-native-router-flux';

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

const setMyResponders = (myResponders) => {
  return {
    type: SET_MY_RESPONDERS,
    data: {
      myResponders
    }
  };
}

export const getMyResponders = (userId, token) => {
  // TODO: fetch list of responders (username + availability) for this user
  // console.log("running getMyResponders for", userId, "with", token);
  // console.log(`URL: ${SERVER_ROOT}/users/${userId}/responders`);
  return (dispatch) => {
    axios.get(
      `${SERVER_ROOT}/users/${userId}/responders`, 
      {
        headers: { "Authorization": token },
      }
    )
    .then((response) => {
      console.log("getMyResponders response:", response.data.responders);
      dispatch(setMyResponders(response.data.responders));
    })
    .catch((error) => {
      console.log("getMyResponders error:", error);
    });
  }
}

// const addToMyResponders = (respondersToAdd) => {
//   return {
//     type: ADD_RESPONDERS,
//     data: {
//       respondersToAdd
//     }
//   };
// }

export const addResponders = (userId, token, respondersToAdd, myResponders) => {
  // TODO: ping backend to add usernames in usernamesToAdd to this user's profile
  // Should receive a response containing the users we just added (username + availability).
  // Store that response in addedResponders and delete getFakeResponse
  console.log("AddResponders for", userId, "adding", respondersToAdd)
  return (dispatch) => {
    axios.post(
      `${SERVER_ROOT}/users/${userId}/responders`, 
      { respondersToAdd },
      {
        headers: { "Authorization": token },
      }
    )
    .then((response) => {
      console.log("AddResponders response:", response.data.respondersAdded);
      const newMyResponders = [...myResponders, ...response.data.respondersAdded];
      dispatch(setMyResponders(newMyResponders));
    })
    .catch((error) => {
      console.log("AddResponders error:", error);
    });
  }
}

// const removeFromMyResponders = (respondersToRemove) => {
//   return {
//     type: REMOVE_RESPONDERS,
//     data: {
//       respondersToRemove
//     }
//   }
// }

export const removeResponders = (userId, token, respondersToRemove, myResponders) => {
  console.log("RemoveResponders for", userId, "removing", respondersToRemove[0].id)
  return (dispatch) => {
    axios.request({

      // For deleting a batch of users -- DELETE /users/:id/responders/
      // method: "delete",
      // url: `${SERVER_ROOT}/users/${userId}/responders`, 
      // headers: {"Authorization": token},
      // data: { respondersToRemove },
      
      // For deleting a single user -- DELETE /users/:id/responders/:responderid
      method: "delete",
      url: `${SERVER_ROOT}/users/${userId}/responders/${respondersToRemove[0].id}`, 
      headers: { "Authorization": token },

    })
    .then((response) => {
      console.log("removeResponders response:", response.data);

      // For deleting a batch of users -- DELETE /users/:id/responders/
      // let removedUserIds = [];
      // for (responder of response.data) {
      //   removedUserIds.push(responder.id);
      // }

      // For deleting a single user -- DELETE /users/:id/responders/:responderid
      let removedUserIds = [response.data.id];

      let newMyResponders = [];
      for (responder of myResponders) {
        if (!removedUserIds.includes(responder.id)) {
          newMyResponders.push(responder);
        }
      }
      dispatch(setMyResponders(newMyResponders));
      Actions.pop();
    })
    .catch((error) => {
      console.log("removeResponders error:", error);
    });
  }
}
