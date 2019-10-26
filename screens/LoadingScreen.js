import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";

const LoadingScreen = () => {
  useEffect(() => {
    asyncCheckToken();
  })

  asyncCheckToken = async() => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      Actions.main();
    } else {
      Actions.auth();
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Loading Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default LoadingScreen;