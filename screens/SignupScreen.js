import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Signup Screen
      </Text>
      <Button title="Go to Login" onPress={() => Actions.login()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default SignupScreen;