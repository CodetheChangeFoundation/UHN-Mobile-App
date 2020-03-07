import React, { useEffect, useState } from "react";
import { StyleSheet, Alert, AppState, Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../../styles/base";
import statusCodes from "../../constants/statusCodes";
import { View } from "../../components/layout";
import { Text } from "../../components/typography";
import { Modal } from "../../components/popups";
import { Button } from "../../components/buttons";
import { connect } from "react-redux";
import { dismissNotification } from "../../store/actions";
import { convertToAddress } from "../../services/location-functions.service";
import { addResponderToHelpRequest } from "../../services/help-request.service";

const ResponderHelpRequestModal = (props) => {
  if (
    AppState.currentState.match(/inactive|background/) &&
    Platform.OS !== "ios"
  )
    return null;

  const incomingNotification = props.notification.notificationQueue[0];
  const userWhoNeedsHelp = incomingNotification.user;
  const [address, setAddress] = useState(null);

  if (!!userWhoNeedsHelp.location.coords.lat && !!userWhoNeedsHelp.location.coords.lng && !address) {
    convertToAddress(userWhoNeedsHelp.location.coords, setAddress, setAddress("Error finding location."));
  }

  acceptRequest = () => {
    addResponderToHelpRequest(props.auth.userId, props.auth.token, incomingNotification.helpRequestId)
      .then((response) => {

        // Handle error where there are already 6 responders who accepted
        if (!!response) {
          if (response.status == statusCodes.ok) {
            Actions.pop()
            Actions.assignment();
          } else if ((response.status == statusCodes.badRequest) 
            && (response.data.statusCode == statusCodes.limitReachedError)) {
            Alert.alert(
              "No Help Required",
              `${userWhoNeedsHelp.username} does not need your help anymore. Thanks!`,
              [{
                text: "OK",
                onPress: () => props.dismissNotification()
              }]
            );
          } else {
            props.dismissNotification();
          }
        } else {
          props.dismissNotification();
        }

      })
  }

  declineRequest = () => {
    props.dismissNotification();
  }

  const modalHeader = `${userWhoNeedsHelp.username}\nis unresponsive`;
  const modalBody = (
    <View style={styles.body}>
        <Text style={styles.address}>{address || "Location not specified."}</Text>
        <Button variant="affirmation" size="large"
          onPress={() => acceptRequest()}
        >
          I am on my way with Naloxone
        </Button>
        <Button variant="light" size="large" 
          style={styles.bottomButton}
          onPress={() => declineRequest()}
        >
          I can't help now
        </Button>
      </View>
  );

  // Wait until location coordinates have been converted into an address
  // if (userWhoNeedsHelp.location && !address) return null;
  return (
    <Modal
      modalVisible={true}
      modalHeader={modalHeader}
      modalBody={modalBody}
    />
  );
};

/* Styles */

const styles = StyleSheet.create({
  body: {
    flex: 0,
  },
  address: {
    textAlign: "center"
  },
  bottomButton: {
    marginTop: 0,
  }
})

mapStateToProps = state => {
  return {
    notification: state.notification,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { dismissNotification })(ResponderHelpRequestModal);
