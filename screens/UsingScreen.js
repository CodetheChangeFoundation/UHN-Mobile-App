import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from 'react-redux'
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer";
import { Container, Content, Header, View, Segment, Banner } from "../components/layout";
import { Button, IconButton } from "../components/buttons";
import { computeDistance } from '../utils'
import { makeAlarmLog, getNumberOfAvailableResponders } from "../store/actions";

const fredVictorCoordinates = {
  lat: 43.6536212,
  lng: -79.3751693
}

// TODO: Remember to change this to 500 prior to Beta testing
const MAXIMUM_DISTANCE = 1000000000 // meters


class UsingScreen extends Component {
  
  constructor(props) {
    super(props);
    this.startAlarm.bind(this);
  }

  startAlarm = () => {
    const { time, userId, token } = this.props;
    const { timeRemaining } = time
    const distance = computeDistance(fredVictorCoordinates, this.props.location.coords)
    if (distance > MAXIMUM_DISTANCE) Alert.alert("Cannot start alarm", "There are no responders within your area", [
      { text: 'OK' }
    ], { cancelable: false })
    else {
      Actions.alarm();

      this.props.makeAlarmLog(userId, timeRemaining, token);
    }
  }

  componentDidMount(){
    this.props.getNumberOfAvailableResponders(this.props.userId, this.props.token);
  }

  render() {
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
            <IconButton variant="icon" name="md-pin" label="current location" onPress={() => Actions.location()} />
            <IconButton variant="counter" counterValue={this.props.respondersAvailable} label="responders available" onPress={() => Actions.responders()} />
          </Banner>

          <View style={styles.timer}>
            <Timer isUsing={false} />
          </View>

          <View style={styles.startButton}>
            <Button variant="affirmation" size="large" onPress={this.startAlarm}>start</Button>
          </View>
        </Content>
      </Container>
    );
  }
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
    token: state.auth.token,
    respondersAvailable: state.userData.respondersAvailable
  }
}

export default connect(mapStateToProps, { makeAlarmLog, getNumberOfAvailableResponders })(UsingScreen);