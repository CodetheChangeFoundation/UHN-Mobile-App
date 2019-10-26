import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";
import { Actions } from "react-native-router-flux";

const RespondingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Responding Screen
      </Text>
      <Button title="Using" onPress={() => Actions.using()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default RespondingScreen;