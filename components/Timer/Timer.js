import React, { Component } from "react";
import { View } from "react-native";
import ProgressCircle from "./ProgressCircle"

export default class Timer extends Component {
  state = {
    using: false,
    time: 120,
    timeRemaining: 120,
  };

  countdown() {
    if (this.state.timeRemaining - 1 <= 0) {
      this.setState({ timeRemaining: 0 });
      clearInterval(this.interval);
    } else {
      this.setState({ timeRemaining: this.state.timeRemaining - 1 });
    }
  };

  incrementTimer() {
    this.setState({ timeRemaining: this.state.timeRemaining + 15, 
                    time: this.state.timeRemaining + 15 }, 
                    () => {
                      if(this.props.using){
                        clearInterval(this.interval);
                        this.interval = setInterval(() => {
                          this.countdown();
                        }, 1000);
                      }
                    });
  };

  decrementTimer() {
    if (this.state.timeRemaining > 15) {
      this.setState({ timeRemaining: this.state.timeRemaining - 15,
                      time: this.state.timeRemaining - 15 }, 
                      () => {
                        if(this.props.using){
                          clearInterval(this.interval);
                          this.interval = setInterval(() => {
                            this.countdown();
                          }, 1000);
                        }
                    });
    }
  };

  componentDidMount() {
    if (this.props.using) {
      this.interval = setInterval(() => {
        this.countdown();
      }, 1000);
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View>
        <ProgressCircle percentage={(1 - this.state.timeRemaining / this.state.time) * 100}
          seconds={this.state.timeRemaining} increaseTimeHandler={() => this.incrementTimer()} decreaseTimeHandler={() => this.decrementTimer()} />
      </View>
    );
  }
};