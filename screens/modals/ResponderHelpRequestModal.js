import React, { useEffect, useState } from "react";
import { StyleSheet, AppState, Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../../styles/base";
import statusCodes from "../../constants/statusCodes";
import { Container, Content, Header, View } from "../../components/layout";
import { Text } from "../../components/typography";
import { Modal } from "../../components/popups";
import { Button } from "../../components/buttons";
import { convertToAddress } from "../../utils";
import { connect } from "react-redux";
import { dismissNotification, makeResponseLog } from "../../store/actions";
import { addResponderToHelpRequest } from "../../services/help-request.service";
import { HELP_REQUEST_RESPONDER_LIMIT } from "../../constants/helpRequest";

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
            props.makeResponseLog(props.auth.userId, incomingNotification.alarmMetricId, "true", props.auth.token);

            Actions.assignment();
          } else if ((response.status == statusCodes.badRequest) 
            && (response.data.statusCode == statusCodes.limitReachedError)) {
            Actions.alert({
              alertTitle: "No Help Required",
              alertBody: `${userWhoNeedsHelp.username} does not need your help anymore. Thanks!`,
              positiveButton: { text: "OK", onPress: () => props.dismissNotification() },
            });
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
    props.makeResponseLog(props.auth.userId, incomingNotification.alarmMetricId, "false", props.auth.token);
  }

  const modalHeader = `${userWhoNeedsHelp.username}\nis unresponsive`;
  const modalBody = (
    <View style={styles.body}>
        <Text style={styles.address}>{address || "Location not specified."}</Text>
        <Button variant="affirmation" size="large"
          style={styles.button}
          onPress={() => acceptRequest()}
        >
          I am on my way with Naloxone
        </Button>
        <Button variant="light" size="large" 
          style={styles.button}
          onPress={() => declineRequest()}
        >
          I can't help now
        </Button>
      </View>
  );

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
  button: {
    marginTop: theme.layout.margin,
  }
})

mapStateToProps = state => {
  return {
    notification: state.notification,
    currentResponseLog: state.metricResponse.currentResponseLog,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { dismissNotification, makeResponseLog })(ResponderHelpRequestModal);
