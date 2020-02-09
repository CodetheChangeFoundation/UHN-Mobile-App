import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';
import { SET_MY_RESPONDERS } from "./Types"
import { Actions } from 'react-native-router-flux';


const setMyResponders = (myResponders) => {
  return {
    type: SET_MY_RESPONDERS,
    data: {
      myResponders
    }
  };
}

export const getMyResponders = (userId, token) => {
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

export const addResponders = (userId, token, respondersToAdd, myResponders) => {
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
