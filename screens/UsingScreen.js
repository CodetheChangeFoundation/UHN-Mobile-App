import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer";

const UsingScreen = () => {
  return (
    <View style={styles.container}>
      <Timer using={false}/>
      <Text style={styles.welcome}>
        Using Screen
      </Text>
      <Button title="Responding" onPress={() => Actions.responding()} />
      <Button title="Start" onPress={() => Actions.alarm()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default UsingScreen;