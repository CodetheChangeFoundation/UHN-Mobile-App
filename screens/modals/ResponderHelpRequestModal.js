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
      <Button variant="affirmation" size="large">
        I am on my way with Naloxone
      </Button>
      <Button variant="light" size="large" 
        onPress={() => Actions.pop()}
      >
        I can't help now
      </Button>
    </View>
  );

  acceptRequest = () => {
    // TODO: hit help request endpoint to check if < 6 people have taken the request yet
    // if yes, then redirect to DirectionsScreen
    // if no, show a message saying the request has been taken & we don't need your help any more
    console.log("Help request accepted");
  }

  declineRequest = () => {
    Actions.pop();
  }

  return (
    <Container>
      <Modal
        modalVisible={true}
        modalHeader={modalHeader}
        modalBody={modalBody}
        onBackdropPress={() => declineRequest()}
        onBackButtonPress={() => declineRequest()}
      />
    </Container>
  );
};

/* Styles */

const styles = StyleSheet.create({
  buttons: {
    // marginTop: theme.layout.margin,
    justifyContent: "space-around",
    // backgroundColor: "pink",
    // width: "100%"
  }
})

export default ResponderHelpRequestModal;
