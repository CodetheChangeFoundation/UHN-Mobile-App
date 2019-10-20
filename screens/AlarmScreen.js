import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const AlarmScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Alarm Screen
      </Text>
      <Button title="Exit" onPress={() => Actions.main()} />
      <Button title="Out of Time" onPress={() => Actions.snooze()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default AlarmScreen;