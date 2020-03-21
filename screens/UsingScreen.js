import React from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from 'react-redux'
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer";
import { Container, Content, Header, View, Segment, Banner } from "../components/layout";
import { Button, IconButton } from "../components/buttons";
import { computeDistance } from '../utils'
import { makeAlarmLog } from "../store/actions";

const fredVictorCoordinates = {
  lat: 43.6536212,
  lng: -79.3751693
}

// TODO: Remember to change this to 500 prior to Beta testing
const MAXIMUM_DISTANCE = 1000000000 // meters

const UsingScreen = (props) => {

  const { location, time, userId, token } = props;
  const { timeRemaining } = time

  const startAlarm = () => {
    // Check if location has been set
    console.log({location})
    if( location === null
        || location.coords === null
        || (location.coords.lat !== 0 && location.coords.lng !== 0)
      ) {
      Alert.alert("Cannot start alarm", "Your location is not set. Please set your location in the 'locations' page' and enable location services on your device.", [
        { text: 'Set my location now', onPress: () => {
          Actions.location()
        } },
        { text: 'Cancel', onPress: () => {} }
        ], { cancelable: false })
      return null
    }

    // Check for responders in the area (for beta-testing, compare to the coordinates of the Fred Victor Building)
    const distance = computeDistance(fredVictorCoordinates, location.coords)
    if( distance > MAXIMUM_DISTANCE ) {
      Alert.alert("Cannot start alarm", "There are no responders within your area", [
      { text: 'OK' }
      ], { cancelable: false })
      return null
    }

    Actions.alarm();

    props.makeAlarmLog(userId, timeRemaining, token);
  }

  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Using Mode</Header>

    <Content>
      <Banner>
        <Segment active="left"
          leftText="using" rightText="responding"
          onRightButtonPress={() => Actions.responding()}
        />
      </Banner>
      <Banner>
        <IconButton variant="icon" name="md-pin" label="current location" onPress={() => Actions.location()}/>
        <IconButton variant="counter" counterValue={3} label="responders available" onPress={() => Actions.responders()} />
      </Banner>
    
      <View style={styles.timer}>
        <Timer isUsing={false}/>
      </View>

      <View style={styles.startButton}>
        <Button variant="affirmation" size="large" onPress={startAlarm}>start</Button>
      </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  timer: {
    flex: 5,
  },
  startButton: {
    flex: 2,
  },
});

const mapStateToProps = (state, currentProps) => {
  const { location } = state.userData;
  return { 
    location,
    userId: state.auth.userId,
    time: state.timer, 
    token: state.auth.token
  }
}

export default connect(mapStateToProps, { makeAlarmLog })(UsingScreen);