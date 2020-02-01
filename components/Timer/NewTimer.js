import React, { Component } from "react";
import { Text, View } from "react-native";
//import ProgressCircle from "./ProgressCircle"
import { connect } from 'react-redux';
import { increaseTime, decreaseTime, countdown, clearTime, resetTime } from '../../store/actions';
import ProgressCircle from 'react-native-progress-circle';


class NewTimer extends Component {

  constructor(props) {
    super(props);
    this.countdown = this.countdown.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
  }

  countdown() {
    if (this.props.time.timeRemaining - 1 <= 0) {
      this.props.clearTime();
      clearInterval(this.interval);
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
    console.log("$$$$$$$$$$$$$$$$$$$ NEWTIMER COMPONENT RENDERED $$$$$$$$$$$$$$$$$$$$")
    const { time, timeRemaining } = this.props.time;
    // return <Text>New Timer</Text>

    return (
      <ProgressCircle
        percent={(1 - timeRemaining / time) * 100}
        radius={127.5}
        borderWidth={8}
        color="#999b9e"
        shadowColor="#60a781"
        bgColor="#ffffff"
      >
        <Text style={{ fontSize: 72, fontWeight: "bold", color: "#67686B" }}>{convertSecondsToMinutes(timeRemaining)}:{convertSeconds(timeRemaining)}</Text>
      </ProgressCircle>
    )

    // return (
    //   <View>
    //     <ProgressCircle percentage={(1 - timeRemaining / time) * 100}
    //       seconds={timeRemaining} increaseTimeHandler={this.incrementTimer} decreaseTimeHandler={this.decrementTimer} />
    //   </View>
    // );
  }
};

function mapStateToProps(state) {
  return {
    time: state.timer
  }
}

export default connect(mapStateToProps, { increaseTime, decreaseTime, countdown, clearTime, resetTime })(NewTimer);