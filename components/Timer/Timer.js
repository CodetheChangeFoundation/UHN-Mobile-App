import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { increaseTime, decreaseTime, countdown, clearTime, resetTime, updateAlarmLog } from "../../store/actions";
import ProgressCircle from "react-native-progress-circle";
import SetTimeButton from "./SetTimeButton";
import { View } from "../layout";
import { Text } from "../typography";
import theme from "../../styles/base";

class Timer extends Component {
  countdown = () => {
    if (this.props.time.timeRemaining - 1 <= 15) {
      clearInterval(this.interval);
      Actions.snooze();
    } else {
      this.props.countdown(this.props.time.timeRemaining);
    }
  };

  resetInterval = () => {
    if (this.props.isUsing) {
      clearInterval(this.interval);
      this.interval = setInterval(() => { this.countdown(); }, 1000);
    }
  };

  incrementTimer = () => {
    this.props.increaseTime(this.props.time.timeRemaining);
    if (this.props.isUsing) {
      this.props.updateAlarmLog(this.props.time.timeRemaining + 15, null, this.props.currentAlarmLog, this.props.token);
    }
    this.resetInterval();
  };

  decrementTimer = () => {
    if (this.props.isUsing) {
      this.props.updateAlarmLog(this.props.time.timeRemaining - 15, false, this.props.currentAlarmLog, this.props.token);
    }
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
  };

  render() {
    const { time, timeRemaining } = this.props.time;
    return (
      <ProgressCircle
        percent={(1 - timeRemaining / time) * 100}
        radius={127.5}
        borderWidth={8}
        color={theme.colors.lightGrey}
        shadowColor={timeRemaining < 30 ? theme.colors.red : theme.colors.green}
        bgColor={theme.colors.white}
      >

        <SetTimeButton changeTimeHandler={this.incrementTimer}>+ 15</SetTimeButton>

        <View style={styles.timerContainer}>
          <View style={styles.timerTextContainer}>
            <View style={styles.minutes}>
              <Text variant="numeral" style={styles.numeral}>{this.convertSecondsToMinutes(timeRemaining)}</Text>
              <Text variant="label" style={styles.text}>minutes</Text>
            </View>
            <View style={styles.separator}>
              <Text variant="numeral" style={styles.numeral}>:</Text>
              <Text variant="label" style={styles.text}> </Text>
            </View>
            <View style={styles.seconds}>
              <Text variant="numeral" style={styles.numeral}>{this.convertSeconds(timeRemaining)}</Text>
              <Text variant="label" style={styles.text}>seconds</Text>
            </View>
          </View>
        </View>

        <SetTimeButton changeTimeHandler={this.decrementTimer}>- 15</SetTimeButton>

      </ProgressCircle>
    );
  }
};

const styles = StyleSheet.create({
  timerContainer: {
    flex: 0,
    width: "90%"
  },
  timerTextContainer: {
    flex: 0,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  numeral: {
    marginVertical: -18
  },
  text: {
    marginTop: -(theme.layout.padding)
  },
  minutes: {
    flex: 2
  },
  separator: {
    flex: 0,
    paddingHorizontal: theme.layout.padding
  },
  seconds: {
    flex: 3
  }
});

const mapStateToProps = (state) => {
  return {
    time: state.timer,
    token: state.auth.token,
    currentAlarmLog: state.metricAlarm.currentAlarmLog
  }
};

export default connect(mapStateToProps, {
  increaseTime,
  decreaseTime,
  countdown,
  clearTime,
  resetTime,
  updateAlarmLog
})(Timer);