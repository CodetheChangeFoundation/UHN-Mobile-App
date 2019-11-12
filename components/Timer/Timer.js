import React, { Component } from "react";
import { View } from "react-native";
import ProgressCircle from "./ProgressCircle"
import { connect } from 'react-redux';
import { increaseTime, decreaseTime, countdown, clearTime, resetTime } from '../../store/actions';

class Timer extends Component {

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
    if (this.props.using) {
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
    if (this.props.using) {
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
      <View>
        <ProgressCircle percentage={(1 - timeRemaining / time) * 100}
          seconds={timeRemaining} increaseTimeHandler={this.incrementTimer} decreaseTimeHandler={this.decrementTimer} />
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    time: state.timer
  }
}

export default connect(mapStateToProps, { increaseTime, decreaseTime, countdown, clearTime, resetTime })(Timer);