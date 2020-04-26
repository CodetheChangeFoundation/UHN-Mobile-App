import React, { Fragment } from "react";
import { StyleSheet, AsyncStorage, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { View } from "../layout";
import { Button } from "../buttons";
import { Text } from "../typography";
import { connect } from 'react-redux';
import { removeNotificationToken } from "../../services/notification-token.service"
import * as TokenService from "../../services/token.service";
import { setStatus } from '../../store/actions'
import { List, ListItem } from '../layout'
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
  }

  const routes = [
    { name: 'Using', function: Actions.using },
    { name: 'Responding', function: Actions.responding },
    { name: 'User Profile', function: Actions.profile },
    { name: 'Resource', function: Actions.resource },
    { name: 'Logout', function: () => { Actions.modal(modalParams) } },
  ]

  return (
    <Fragment>
      <View style={styles.topContainer}>
        <Image source={require("../../assets/logo.png")} resizeMode="contain"></Image>
      </View>
      <View style={styles.bottomContainer}>
        <List style={styles.list}>
          {routes.map((route) => (
            <TouchableOpacity
              key={`list-${route.name}`}
              onPress={route.function}
              style={styles.stretch}
            >
              <ListItem
                style={styles.list}
                leftText={route.name}
                leftTextStyle={styles.item}
                rightText=""
              />
            </TouchableOpacity>
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
    alignContent: "center",
    alignItems: "center"
  },
  bottomContainer: {
    flex: 2,
  },
  stretch: {
    alignSelf: 'stretch',
  },
  list: {
    alignSelf: 'stretch',
    borderBottomColor: theme.colors.fadedGrey,
  },
  item: {
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingRight: 0,
    marginLeft: 0,
    flex: 0,
  }
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    naloxoneAvailability: state.userData.naloxoneAvailability
  }
}

export default connect(mapStateToProps, { setStatus })(DrawerContent);
