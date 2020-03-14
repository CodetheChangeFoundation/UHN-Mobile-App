import React, { Component } from "react";
import { StyleSheet, Vibration } from "react-native";
import { Button } from "../components/buttons";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { connect } from 'react-redux';
import { increaseTime, decreaseTime, countdown, clearTime, resetTime, updateAlarmLog } from '../store/actions';
import { sendHelpRequest } from "../services/help-request.service";
import { Audio } from 'expo-av';


class SnoozeScreen extends Component {
  constructor(props) {
    super(props);
    this.countdown = this.countdown.bind(this);
    this.snoozeHandler = this.snoozeHandler.bind(this);
  }

  countdown() {
    if (this.props.time.timeRemaining - 1 <= 0) {
      this.props.clearTime();
      clearInterval(this.interval);
      sendHelpRequest(this.props.userId, this.props.token)
      .then((response) => {
        Actions.alert({
          alertTitle: "Help request sent",
          alertBody: "A help request has been sent to your responder network.",
          positiveButton: { text: "OK", onPress: () => Actions.main() },
          cancelable: false 
        });
        
        this.props.updateAlarmLog(null, true, this.props.currentAlarmLog, this.props.token)
      })
    } else {
      this.props.countdown(this.props.time.timeRemaining);
    }
  };

  convertSeconds = (seconds) => {
    let second = Math.floor(seconds % 3600 % 60);
    if (second <= 9) {
      second = "0" + second;
    }
    return second;
  };

  convertSecondsToMinutes = (seconds) => {
    let minute = Math.floor(seconds % 3600 / 60);
    return minute;
  };

  snoozeHandler() {
    this.props.updateAlarmLog(120, null, this.props.currentAlarmLog, this.props.token);
    clearInterval(this.interval);
    this.props.resetTime();
    Actions.alarm();
  };

  async componentDidMount() {
    this.props.countdown(this.props.time.timeRemaining);
    this.interval = setInterval(this.countdown, 1000);
    Vibration.vibrate([1000, 1000], true);
    this.soundObject = new Audio.Sound();
    try {
      await this.soundObject.loadAsync(require('../assets/radar.mp3'));
    } catch (error) {
      console.log('Cant load sound!')
    }
    this.soundObject.setIsLoopingAsync(true);
    this.soundObject.playAsync();
  };

  componentWillUnmount() {
    Vibration.cancel();
    this.soundObject.stopAsync();
  }

  render() {
    const { timeRemaining } = this.props.time;
    return (
      <Container style={{backgroundColor: (timeRemaining % 2 === 0)? "#ff0000" : "#ffa500"}}>
        <Header>Snooze Mode</Header>
        <Content>
          <View style={styles.container, {backgroundColor: (timeRemaining % 2 === 0)? "#ff0000" : "#ffa500"}}>
            <Text style={styles.textStyle}> 
              Your responders{"\n"}will be notified in:
            </Text>
            <Text style={styles.timeStyle}>
              {this.convertSecondsToMinutes(timeRemaining)}:{this.convertSeconds(timeRemaining)}
            </Text>
            <Button variant="light" size="large" onPress={this.snoozeHandler}>
              snooze
            </Button>
            <Text style={styles.textStyle}>
              We'll check up on you in 2 minutes
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold", 
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    alignItems: "center",
  },
  timeStyle: {
    fontSize: 72, 
    fontWeight: "bold", 
    color: "#ffffff",
    textAlign: "center",
    paddingTop: 60,
    paddingBottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

function mapStateToProps(state) {
  return {
    time: state.timer,
    userId: state.auth.userId,
    token: state.auth.token,
    currentAlarmLog: state.alarm.currentAlarmLog
  }
}

export default connect(mapStateToProps, { increaseTime, decreaseTime, countdown, clearTime, resetTime, updateAlarmLog })(SnoozeScreen);