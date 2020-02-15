import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';
import { SET_MY_RESPONDERS, RESPONDERS_ERROR } from "./Types"
import { Actions } from 'react-native-router-flux';


export const respondersError = (error) => {
  console.log("Responders Error:", error);
  return {
    type: RESPONDERS_ERROR
  };
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
  return (dispatch) => {
    axios.get(
      `${SERVER_ROOT}/users/${userId}/responders`, 
      {
        headers: { "Authorization": token },
      }
    )
    .then((response) => {
      dispatch(setMyResponders(response.data.responders));
    })
    .catch((error) => {
      dispatch(respondersError(error));
    });
  }
}

export const addResponders = (userId, token, respondersToAdd, myResponders) => {
  return (dispatch) => {
    axios.post(
      `${SERVER_ROOT}/users/${userId}/responders`,
      { respondersToAdd },
      {
        headers: { "Authorization": token },
      }
    )
    .then((response) => {
      const newMyResponders = [...myResponders, ...response.data.respondersAdded];
      dispatch(setMyResponders(newMyResponders));
      Actions.pop();
    })
    .catch((error) => {
      dispatch(respondersError(error));
    });
  }
}

export const removeResponders = (userId, token, respondersToDelete, myResponders) => {
  return (dispatch) => {
    axios.request({
      method: "delete",
      url: `${SERVER_ROOT}/users/${userId}/responders`, 
      headers: {"Authorization": token},
      data: { respondersToDelete },
    })
    .then((response) => {
      let removedUserIds = [];
      for (responder of response.data.respondersDeleted) {
        removedUserIds.push(responder.id);
      }
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
      dispatch(respondersError(error));
    });
  }
}
