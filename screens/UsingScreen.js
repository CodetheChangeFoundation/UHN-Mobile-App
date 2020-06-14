import React, { useEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer";
import { Container, Content, Header, View, Segment, Banner } from "../components/layout";
import { Button, IconButton } from "../components/buttons";
import { convertToAddressAsync } from "../utils";
import { makeAlarmLog, getNumberOfAvailableResponders, setLocalLocation, getMyResponders } from "../store/actions";
import theme from "../styles/base";

// const fredVictorCoordinates = {
//   lat: 43.6536212,
//   lng: -79.3751693
// };

// TODO: Remember to change this prior to Beta testing
// const MAXIMUM_RESPONDER_DISTANCE = 10000000000000000; // meters
const MINIMUM_RESPONDERS = 1;

const UsingScreen = props => {
  const { time, userId, token } = props;
  const { timeRemaining } = time;

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // ERROR FUNCTIONS

  const locationErrorAlert = () => {
    Actions.alert({
      alertTitle: "Cannot start alarm",
      alertBody: "Your location is invalid.",
      positiveButton: {
        text: "Set my location now",
        onPress: () => { Actions.location() },
        cancelable: false
      },
    });
  }

  const responderErrorAlert = () => {
    Actions.alert({
      alertTitle: "Cannot start alarm",
      alertBody: "There are not enough available responders within your area.",
      positiveButton: { text: "OK" },
      cancelable: false
    });
  }

  const confirmAddressAlert = async (address, note) => new Promise((resolve) => {
    Actions.alert({
      alertTitle: "Confirm your location!",
      alertBody: `Location: \n${address}\n\nNote: \n${note ? note : "None"}\n\nIs this correct?`,
      positiveButton: {
        text: "Yes",
        cancelable: true,
        onPress: () => resolve("confirmed")
      },
      negativeButton: {
        text: "No",
        style: "cancel",
        onPress: () => resolve("unconfirmed")
      },
      onCancel: () => resolve("cancelled")
    });
  })

  // ALARM START FUNCTION

  const startAlarm = () => {
    setButtonDisabled(true);

    // FIRST CHECK: Get last known user location from Redux and confirm with the user
    Promise.resolve(props.location)
      .then(async ({ coords, note }) => {
        if (!coords || (coords.lat === 0 && coords.lng === 0)) throw "LocationError";
        const address = await convertToAddressAsync(coords);
        return { address, note };
      })
      // Confirm with the user
      .then(async ({ address, note }) => {
        const confirmation = await confirmAddressAlert(address, note);
        if (confirmation === "unconfirmed") throw "LocationScreen";
        if (confirmation === "cancelled") throw "ExitPromise";
      })
      // SECOND CHECK: check for responders in the area (by distance)
      .then(async () => {
        // check that there are minimum number of responders
        if (props.respondersAvailable < MINIMUM_RESPONDERS) throw "ResponderError";

        // If all the checks pass, finally redirect to alarm page
        setButtonDisabled(false);
        props.makeAlarmLog(userId, timeRemaining, token);

        Actions.alarm();
      })
      .catch(err => {
        switch (err) {
          case "LocationError":
            locationErrorAlert();
            break;
          case "LocationScreen":
            setButtonDisabled(false);
            Actions.location();
            break;
          case "ResponderError":
            responderErrorAlert();
            break;
          case "ExitPromise":
            break;
          default:
            console.error(err);
        }
        setButtonDisabled(false);
      });
  };

  // GET RESPONDERS

  useEffect(() => {
    props.getMyResponders(userId, token);

    let interval = setInterval(
      () => props.getNumberOfAvailableResponders(props.userId, props.token),
      5000
    );

    return (cleanUp = () => {
      clearInterval(interval);
    });
  }, []);

  return (
    <Container>
      <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>
        Using Mode
      </Header>

      <Content>
        <Segment
          style={styles.segment}
          active="left"
          leftText="using"
          rightText="responding"
          onRightButtonPress={() => Actions.responding()}
        />
        <Banner style={styles.icons}>
          <IconButton
            variant="icon"
            name="md-pin"
            label="current location"
            onPress={() => Actions.location()}
          />
          <IconButton
            variant="counter"
            counterValue={props.respondersAvailable}
            label="responders available"
            onPress={() => Actions.responders()}
          />
        </Banner>

        <View style={styles.timer}>
          <Timer isUsing={false} />
        </View>

        <View style={styles.startButton}>
          <Button
            variant="affirmation"
            size="large"
            disabled={buttonDisabled}
            loadingText="wait..."
            onPress={() => startAlarm()}
          >
            start
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  segment: {
    flex: 0
  },
  icons: {
    flex: 0,
    flexGrow: 1,
    padding: theme.layout.padding
  },
  timer: {
    flex: 0,
    flexGrow: 2
  },
  startButton: {
    flex: 3
  }
});

const mapStateToProps = (state, currentProps) => {
  return {
    userId: state.auth.userId,
    time: state.timer,
    token: state.auth.token,
    respondersAvailable: state.userData.respondersAvailable,
    location: state.userData.location
  };
};

export default connect(mapStateToProps, {
  makeAlarmLog,
  getNumberOfAvailableResponders,
  setLocalLocation,
  getMyResponders
})(UsingScreen);
