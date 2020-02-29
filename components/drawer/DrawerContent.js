import React, { useState, Fragment } from "react";
import { StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { Modal } from "../popups";
import { View } from "../layout";
import { Button } from "../buttons";
import { Text } from "../typography";
import { connect } from 'react-redux';
import { removePushToken } from "../../services/push-token.service"
import { List, ListItem } from '../layout'
import theme from "../../styles/base";


const DrawerContent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const modalHeader = "Logout";
  const modalBody = (<Text>Are you sure?</Text>);
  const modalFooterLeft = (<Button variant="light" size="medium" onPress={() => setModalVisible(false)}>cancel</Button>);
  const modalFooterRight = (
    <Button
      variant="dark" size="medium"
      onPress={async () => {
        Actions.auth();
        await AsyncStorage.removeItem("token");
        removePushToken(props.auth.userId);
      }}
    >
      logout
    </Button>
  );

  const routes = [
    {name: 'Using', function: Actions.using},
    {name: 'Responding', function: Actions.responding},
    {name: 'User Profile', function: Actions.profile},
    {name: 'Resource', function: Actions.resource},
    {name: 'Logout', function: () => {setModalVisible(true)}},
  ]

  return (
    <Fragment>
      <Modal
        modalVisible={modalVisible}
        modalHeader={modalHeader}
        modalBody={modalBody}
        modalFooterLeft={modalFooterLeft}
        modalFooterRight={modalFooterRight}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />

      <View style={styles.topContainer}>
        <Text>Logo here</Text>
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

// export default DrawerContent;
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {})(DrawerContent);
