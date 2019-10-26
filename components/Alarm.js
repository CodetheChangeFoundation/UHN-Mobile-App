import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ProgressCircle from './ProgressCircle'

export default class Alarm extends Component {
  state = {
    counting: true,
    time: 120,
    timeRemaining: 100,
  };

  countdown(){
    if(this.state.timeRemaining-1 <= 0){
      this.setState({timeRemaining: 0});
      clearInterval(this.interval);
    }else{
      this.setState({timeRemaining: this.state.timeRemaining - 1});
    }
  };

  incrementTimer(){
    this.setState({timeRemaining: this.state.timeRemaining+15});
    this.setState({time: this.state.timeRemaining+15});
  };

  decrementTimer(){
    if(this.state.timeRemaining>15){
      this.setState({timeRemaining: this.state.timeRemaining-15});
      this.setState({time: this.state.timeRemaining-15});
    }
  };

  componentDidMount() {
    console.log('here');
    this.interval = setInterval(() => {
       this.countdown();
    }, 1000);
  };

  render() {
    return (
      <View>
        <ProgressCircle percentage={(1 - this.state.timeRemaining / this.state.time) * 100} 
        seconds={this.state.timeRemaining} increaseTimeHandler={() => this.incrementTimer()} decreaseTimeHandler={() => this.decrementTimer()}/>
      </View>
    );
  }
};