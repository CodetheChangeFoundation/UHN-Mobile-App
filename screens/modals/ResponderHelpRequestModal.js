import React, { useEffect, useState } from "react";
import { StyleSheet, AppState, Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../../styles/base";
import { Container, Content, Header, View } from "../../components/layout";
import { Text } from "../../components/typography";
import { Modal } from "../../components/popups";
import { Button } from "../../components/buttons";
import { convertToAddress } from "../../utils";

const ResponderHelpRequestModal = (props) => {
  if (
    AppState.currentState.match(/inactive|background/) &&
    Platform.OS !== "ios"
  )
    return null;

  const userWhoNeedsHelp = props.notification.data.user;
  const modalHeader = `${userWhoNeedsHelp.username}\nis unresponsive`;
  const [address, setAddress] = useState(null);

  if (userWhoNeedsHelp.location && !address) {
    convertToAddress(userWhoNeedsHelp.location.coords, setAddress);
  }

  useEffect(() => {
    // console.log("notification received: ", JSON.stringify(props.notification));
  });

  acceptRequest = () => {
    // TODO: hit help request endpoint to check if < 6 people have taken the request yet
    // if yes, then redirect to DirectionsScreen + pass notification data
    // if no, alert saying the request has been taken, then dismiss modal
    Actions.assignment();
  }

  declineRequest = () => {
    Actions.pop();
  }

  renderModalBody = () => {
    return (
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
    )
  }

  // Wait until location coordinates have been converted into an address
  if (userWhoNeedsHelp.location && !address) return null;
  return (
    <Modal
      modalVisible={true}
      modalHeader={modalHeader}
      modalBody={renderModalBody()}
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

export default ResponderHelpRequestModal;
