import React, { useEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer";
import { Container, Content, Header, View, Segment, Banner } from "../components/layout";
import { Button, IconButton } from "../components/buttons";
import { computeDistance, getDeviceLocationAsync, convertToAddressAsync } from "../utils";
import { makeAlarmLog, getNumberOfAvailableResponders, setLocalLocation } from "../store/actions";

const fredVictorCoordinates = {
  lat: 43.6536212,
  lng: -79.3751693
};

// TODO: Remember to change this to 500 prior to Beta testing
const MAXIMUM_DISTANCE = 10000000000000000; // meters

const UsingScreen = props => {
  const { time, userId, token } = props;
  const { timeRemaining } = time;

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const locationErrorAlert = () => {
    Actions.alert({
      alertTitle: "Cannot start alarm",
      alertBody: "Your location is not set/invalid. Please set your location in the 'locations' page' and enable location services on your device.",
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
      alertBody: "There are no responders within your area",
      positiveButton: { text: 'OK' },
      cancelable: false
    });
  }

  const confirmAddressAlert = async (address, coords) => new Promise((resolve) => {
    Actions.alert({
      alertTitle: "Confirm your location!",
      alertBody: `Your location is currently \n${address}.\nIs this correct? You will be directed to the locations page if it is not.`,
      positiveButton: {
        text: "Correct",
        cancelable: true,
        // set redux address when confirmed
        onPress: () => {
          props.setLocalLocation(coords);
          resolve('confirmed');
        }
      },
      negativeButton: {
        text: "No",
        style: "cancel",
        onPress: () => {
          resolve('unconfirmed');
        }
      }
    });
  })

  const startAlarm = () => {

    // Disable button presses
    setButtonDisabled(true);

    // FIRST CHECK: Get the device location and confirm with the user
    getDeviceLocationAsync()
    .then(async (deviceCoords) => {
      if (deviceCoords === null || (deviceCoords.lat === 0 && deviceCoords.lng === 0)) throw "LocationError"
      const address = await convertToAddressAsync(deviceCoords)
      return {address, deviceCoords};
    })
    // Confirm with the user
    .then(async ({address, deviceCoords}) => {
      const confirmation = await confirmAddressAlert(address, deviceCoords);
      if(confirmation === 'unconfirmed') throw "LocationScreen"
    })
    // SECOND CHECK: check for responders in the area (by distance)
    .then(() => {
      const distance = computeDistance(fredVictorCoordinates, props.location.coords)
      if( distance > MAXIMUM_DISTANCE ) throw "ResponderError"

      // If all the checks pass, finally redirect to alarm page
      setButtonDisabled(false);
      props.makeAlarmLog(userId, timeRemaining, token);

      Actions.alarm();
    })
    .catch(err => {
      if(err === 'ExitPromise') return null;
      else if(err === 'LocationScreen') {
        Actions.location();
        return null;
      }
      else if(err === 'LocationError') locationErrorAlert();
      else if(err === 'ResponderError') responderErrorAlert();
      else console.error(err);

      setButtonDisabled(false);
    })
  }

  useEffect(() => {
    let interval = setInterval(
      () => props.getNumberOfAvailableResponders(props.userId, props.token),
      5000
    );

    return (cleanUp = () => {
      clearInterval(interval);
    });
  });

  return (
    <Container>
      <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>
        Using Mode
      </Header>

      <Content>
        <Banner>
          <Segment
            active="left"
            leftText="using"
            rightText="responding"
            onRightButtonPress={() => Actions.responding()}
          />
        </Banner>
        <Banner>
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
            variant={buttonDisabled ? "dark" : "affirmation"}
            size="large"
            onPress={() => {!buttonDisabled && startAlarm()}}
          >
            { buttonDisabled ? "wait..." : "start"}
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  timer: {
    flex: 5
  },
  startButton: {
    flex: 2
  }
});

const mapStateToProps = (state, currentProps) => {
  const { location } = state.userData;
  return {
    location,
    userId: state.auth.userId,
    time: state.timer,
    token: state.auth.token,
    respondersAvailable: state.userData.respondersAvailable
  };
};

export default connect(mapStateToProps, { makeAlarmLog, getNumberOfAvailableResponders, setLocalLocation })(
  UsingScreen
);
