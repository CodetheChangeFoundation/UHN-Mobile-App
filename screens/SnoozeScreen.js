import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";
import { Actions } from "react-native-router-flux";

const SnoozeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Snooze Screen
      </Text>
      <Button title="Snooze" onPress={() => Actions.alarm()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default SnoozeScreen;