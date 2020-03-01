import React, { useEffect, useState } from "react";
import { StyleSheet, AppState, Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../../styles/base";
import { Container, Content, Header, View } from "../../components/layout";
import { Text } from "../../components/typography";
import { Modal } from "../../components/popups";
import { Button } from "../../components/buttons";
import { convertToAddress } from "../../utils";
import { connect } from "react-redux";
import { dismissNotification } from "../../store/actions";

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

  useEffect(() => {
    // console.log("help request modal props.notification: \n", JSON.stringify(props.notification, null, 2));
  });

  acceptRequest = () => {
    // TODO: add this responder to the help request
    // if full (has 6 responders already), arrived, or resolved, show alert, dismiss modal, and remove notif from queue
    // otherwise redirect to directions screen
    Actions.pop()
    Actions.assignment();
  }

  declineRequest = () => {
    props.dismissNotification();
    // Actions.pop();
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
    notification: state.notification
  };
};

export default connect(mapStateToProps, { dismissNotification })(ResponderHelpRequestModal);
