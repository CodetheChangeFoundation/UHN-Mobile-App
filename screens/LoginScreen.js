import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Login Screen
      </Text>
      <Button title="Go to Signup" onPress={() => Actions.signup()} />
      <Button title="Login" onPress={() => Actions.main()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default LoginScreen;