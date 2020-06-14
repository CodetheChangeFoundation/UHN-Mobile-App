import React, { Fragment } from "react";
import { StyleSheet, AsyncStorage, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { View } from "../layout";
import { Button } from "../buttons";
import { Text } from "../typography";
import { connect } from "react-redux";
import { removeNotificationToken } from "../../services/notification-token.service";
import * as TokenService from "../../services/token.service";
import { stopLocationTask } from "../../services/task-manager";
import { setStatus } from "../../store/actions";
import { List, ListItem } from "../layout";
import theme from "../../styles/base";

const DrawerContent = (props) => {
  const modalHeader = "Logout";
  const modalBody = (<Text>Are you sure?</Text>);
  const modalFooterLeft = (<Button variant="light" size="medium" onPress={() => Actions.pop()}>cancel</Button>);
  const modalFooterRight = (
    <Button
      variant="dark" size="medium"
      onPress={async () => {
        Actions.auth();
        await stopLocationTask();
        if (props.naloxoneAvailability) {
          props.setStatus(props.auth.userId, props.auth.token, { "online": false })
        }

        // In the case that current token expired, we need the refresh token to make another request to set status
        setTimeout(() => {
          removeNotificationToken(props.auth.userId);
          TokenService.clearToken();
        }, 1500)
      }}
    >
      logout
    </Button>
  );

  const modalParams = {
    modalHeader,
    modalBody,
    modalFooterLeft,
    modalFooterRight,
    onBackdropPress: () => Actions.pop(),
    onBackButtonPress: () => Actions.pop()
  };

  const routes = [
    { name: "Using", function: Actions.using },
    { name: "Responding", function: Actions.responding },
    { name: "User Profile", function: Actions.profile },
    { name: "Resources", function: Actions.resource },
    { name: "Logout", function: () => { Actions.modal(modalParams) } },
  ];

  return (
    <Fragment>
      <View style={styles.topContainer}>
        <Image source={require("../../assets/logo.png")} resizeMode="contain"></Image>
      </View>
      <View style={styles.bottomContainer}>
        <List style={styles.list} scrollEnabled={false}>
          {routes.map((route) => (
            <View style={styles.view} key={`list-${route.name}`}>
              <TouchableOpacity
                onPress={route.function}
                style={styles.button}
              >
                <ListItem
                  style={styles.item}
                  leftText={route.name}
                  leftTextStyle={styles.itemText}
                  rightText=""
                />
              </TouchableOpacity>
            </View>
          ))}
        </List>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomContainer: {
    flex: 2
  },
  list: {
    borderTopWidth: 1,
    borderColor: theme.colors.fadedGrey
  },
  view: {
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderColor: theme.colors.fadedGrey
  },
  button: {
    alignSelf: "stretch"
  },
  item: {
    borderBottomWidth: 0
  },
  itemText: {
    alignSelf: "stretch",
    textAlign: "center",
    paddingRight: 0,
    marginLeft: 0,
    flex: 0
  }
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    naloxoneAvailability: state.userData.naloxoneAvailability
  }
};

export default connect(mapStateToProps, { setStatus })(DrawerContent);
