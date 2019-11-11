import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";

const LoadingScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    asyncLoadFonts();
    asyncCheckToken();
  })

  asyncLoadFonts = async() => {
    if (!fontsLoaded) {
      await Font.loadAsync({
        // UHN requested fonts
        "OpenSans-Regular" : require("../assets/fonts/OpenSans-Regular.ttf"),
        "OpenSans-SemiBold" : require("../assets/fonts/OpenSans-SemiBold.ttf"),
        "Prompt-Regular" : require("../assets/fonts/Prompt-Regular.ttf"),
        // NativeBase fonts
        Roboto : require("../node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium : require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
      setFontsLoaded(true);
    }
  }

  asyncCheckToken = async() => {
    const token = await AsyncStorage.getItem("token");

    if (fontsLoaded) {
      if (token) {
        Actions.main();
      } else {
        Actions.auth();
      }
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Loading Screen
        </Text>
      </View>
    );
  }
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