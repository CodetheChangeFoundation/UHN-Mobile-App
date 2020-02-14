import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { Button } from "../components/buttons";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { connect } from 'react-redux';
import { increaseTime, decreaseTime, countdown, clearTime, resetTime } from '../store/actions';

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
      Alert.alert("Help request sent", "Help request has been sent to your responder network", [{text: 'OK', onPress: () => Actions.main()}], {cancelable: false});
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
    clearInterval(this.interval);
    this.props.resetTime();
    Actions.alarm();
  };

  componentDidMount() {
    this.props.countdown(this.props.time.timeRemaining);
    this.interval = setInterval(this.countdown, 1000);
  };

  render() {
    const { timeRemaining } = this.props.time;
    return (
      <Container style={{backgroundColor: (timeRemaining % 2 === 0)? "#ff0000" : "#ffa500"}}>
        <Header>Snooze Mode</Header>
        <Content>
          <View style={styles.container, {backgroundColor: (timeRemaining % 2 === 0)? "#ff0000" : "#ffa500"}}>
            <Text style={styles.textStyle}> 
              your responders{"\n"}will be notified in:
            </Text>
            <Text style={styles.timeStyle}>
              {this.convertSecondsToMinutes(timeRemaining)}:{this.convertSeconds(timeRemaining)}
            </Text>
            <Button variant="snooze" onPress={this.snoozeHandler}>
              snooze
            </Button>
            <Text style={styles.textStyle}>
              We'll check up on your in 2 minutes
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
    time: state.timer
  }
}

export default connect(mapStateToProps, { increaseTime, decreaseTime, countdown, clearTime, resetTime })(SnoozeScreen);