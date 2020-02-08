import React, { useEffect } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Container, Content, View } from "../components/layout";
import { Text } from "../components/typography";
var jwtDecode = require("jwt-decode");

const LoadingScreen = () => {
  const fontsLoaded = false;

  _loadFonts = async () => {
    return Promise.all([
      Font.loadAsync({
        // UHN requested fonts
        "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
        "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
        "Prompt-Regular": require("../assets/fonts/Prompt-Regular.ttf"),
        // NativeBase fonts
        Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font
      })
    ]);
  };

  _checkToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      let isExpired = false;
      let decodedToken = jwtDecode(token, { complete: true });
      let time = new Date().getTime().toString();
      let currentTime = time.slice(0, time.length - 3);

      if (decodedToken.exp < currentTime) isExpired = true;

      if (!isExpired) {
        Actions.main();
      } else {
        Actions.auth();
      }
    } else {
      Actions.auth();
    }
  };

  _handleLoadingError = error => {
    console.error(`Cannot load fonts: ${error}`);
  };

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={this._loadFonts}
        onError={this._handleLoadingError}
        onFinish={this._checkToken}
      />
    );
  } else {
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <Text style={styles.welcome}>Loading Screen</Text>
          </View>
        </Content>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  }
});

export default LoadingScreen;
