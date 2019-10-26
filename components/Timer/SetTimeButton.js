import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function SetTimeButton({ changeTimeHandler, children }) {
  return (
    <View>
      <TouchableOpacity onPress={changeTimeHandler}>
        <Text style={style.buttonText}>{children}</Text>
        <Text style={style.secondsText}>seconds</Text>
      </TouchableOpacity>
    </View>
  )
};

const style = StyleSheet.create({
  buttonText: {
    paddingLeft: 8,
    fontSize: 22,
    color: '#67686B',
  },
  secondsText: {
    fontSize: 14,
    color: '#67686B',
  }
});