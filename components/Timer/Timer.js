import React, { Component } from "react";
import { Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux';
import { increaseTime, decreaseTime, countdown, clearTime, resetTime } from '../../store/actions';
import ProgressCircle from 'react-native-progress-circle';
import SetTimeButton from "./SetTimeButton";
import { convertSeconds, convertSecondsToMinutes } from '../../services/time-functions.service';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.countdown = this.countdown.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
  }

  countdown() {
    if (this.props.time.timeRemaining - 1 <= 15) {
      clearInterval(this.interval);
      Actions.snooze();
    } else {
      this.props.countdown(this.props.time.timeRemaining);
    }
  };

  resetInterval() {
    if (this.props.isUsing) {
      clearInterval(this.interval);
      this.interval = setInterval(() => { this.countdown(); }, 1000);
    }
  }

  incrementTimer() {
    this.props.increaseTime(this.props.time.timeRemaining);
    this.resetInterval();
  };

  decrementTimer() {
    if (this.props.time.timeRemaining > 15) {
      this.props.decreaseTime(this.props.time.timeRemaining);
      this.resetInterval();
    }
  };

  componentDidMount() {
    if (this.props.isUsing) {
      this.interval = setInterval(this.countdown, 1000);
    } else {
      this.props.resetTime();
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time, timeRemaining } = this.props.time;
    return (
      <ProgressCircle
        percent={(1 - timeRemaining / time) * 100}
        radius={127.5}
        borderWidth={8}
        color="#999b9e"
        shadowColor={timeRemaining < 30 ? "#FF0000" : "#60a781"}
        bgColor="#ffffff"
      >
        <SetTimeButton changeTimeHandler={this.incrementTimer}>+15</SetTimeButton>
        <Text style={{ fontSize: 72, fontWeight: "bold", color: "#67686B" }}>
          {convertSecondsToMinutes(timeRemaining)}:{convertSeconds(timeRemaining)}
        </Text>
        <SetTimeButton changeTimeHandler={this.decrementTimer}>-15</SetTimeButton>

      </ProgressCircle>
    )
  }
};

function mapStateToProps(state) {
  return {
    time: state.timer
  }
}

export default connect(mapStateToProps, { increaseTime, decreaseTime, countdown, clearTime, resetTime })(Timer);