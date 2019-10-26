import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";

const ResourceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Resource Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "magenta",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default ResourceScreen;