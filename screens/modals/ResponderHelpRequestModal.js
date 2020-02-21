import React, { useEffect } from "react";
import { StyleSheet, AppState, Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../../styles/base";
import { Container, Content, Header, View } from "../../components/layout";
import { Text } from "../../components/typography";
import { Modal } from "../../components/popups";
import { Button } from "../../components/buttons";

const ResponderHelpRequestModal = props => {
  if (
    AppState.currentState.match(/inactive|background/) &&
    Platform.OS !== "ios"
  )
    return null;

  useEffect(() => {
    console.log("notification received: ", JSON.stringify(props.notification));
  });

  const userWhoNeedsHelp = props.notification.data.user;
  const modalHeader = `${userWhoNeedsHelp.username}\nis unresponsive`;
  const modalBody = (
    <View style={styles.buttons}>
      <Button variant="affirmation" size="large"
        onPress={() => acceptRequest()}
      >
        I am on my way with Naloxone
      </Button>
      <Button variant="light" size="large" 
        onPress={() => declineRequest()}
      >
        I can't help now
      </Button>
    </View>
  );

  acceptRequest = () => {
    // TODO: hit help request endpoint to check if < 6 people have taken the request yet
    // if yes, then redirect to DirectionsScreen + pass notification data
    // if no, alert saying the request has been taken & dismiss modal
    Actions.assignment();
  }

  declineRequest = () => {
    Actions.pop();
  }

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
  buttons: {
    justifyContent: "space-around",
  }
})

export default ResponderHelpRequestModal;
