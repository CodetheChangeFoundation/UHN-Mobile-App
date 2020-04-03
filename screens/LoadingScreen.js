var jwtDecode = require("jwt-decode");
import { AppLoading, Notifications } from "expo";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { tokenRedirect, setLocalLocation, setNotification } from "../store/actions";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Container, Content, View } from "../components/layout";
import { Text } from "../components/typography";
var jwtDecode = require("jwt-decode");
import { Notifications } from "expo";
import { tokenRedirect, setLocalLocation, receiveNotification } from "../store/actions";
import { connect } from "react-redux";
import { getDeviceLocation } from "../utils/index";
import * as LocalStorageService from "../services/localStorage.service";

const LoadingScreen = props => {
  const fontsLoaded = false;

  useEffect(() => {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }, []);

  _handleNotification = notification => {
    props.receiveNotification(notification.data);
  };

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
    const token = await LocalStorageService.getAccessToken();

    if (token) {
      let isExpired = false;
      let decodedToken = jwtDecode(token, { complete: true });
      let time = new Date().getTime().toString();
      let currentTime = time.slice(0, time.length - 3);

      if (decodedToken.exp < currentTime) isExpired = true;

      if (!isExpired) {
        // TODO: Set actual remember me
        props.tokenRedirect(decodedToken.id, token, false);
        getDeviceLocation(coords => {
          props.setLocalLocation({ coords });
        });
        Actions.main();
      } else {
        console.log("token expired")
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

mapStateToProps = state => {
  return {
    auth: state.auth,
    userData: state.userData,
    notification: state.notification
  };
};

export default connect(mapStateToProps, { tokenRedirect, setLocalLocation, receiveNotification })(
  LoadingScreen
);
