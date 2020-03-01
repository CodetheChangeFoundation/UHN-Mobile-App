import React, { useState, Fragment } from "react";
import { StyleSheet, Button as RNButton, AsyncStorage } from "react-native";
import { Actions, Drawer } from "react-native-router-flux";
import { Modal } from "../popups";
import { View } from "../layout";
import { Button } from "../buttons";
import { Text } from "../typography";
import { connect } from 'react-redux';
import { removePushToken } from "../../services/push-token.service"
import { setStatus } from '../../store/actions'

const DrawerContent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const modalHeader = "Logout";
  const modalBody = (<Text>Are you sure?</Text>);
  const modalFooterLeft = (<Button variant="secondary" onPress={() => setModalVisible(false)}>Cancel</Button>);
  const modalFooterRight = (
    <Button
      variant="primary"
      onPress={async () => {
        Actions.auth();
        await AsyncStorage.removeItem("token");
        removePushToken(props.auth.userId);
        if (props.naloxoneAvailability)
          props.setStatus(props.auth.userId, props.auth.token, { "online": false })
      }}
    >
      Logout
    </Button>
  );

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
        <RNButton title="Using" onPress={() => Actions.using()} />
        <RNButton title="Responding" onPress={() => Actions.responding()} />
        <RNButton title="User Profile" onPress={() => Actions.profile()} />
        <RNButton title="Resource" onPress={() => Actions.resource()} />
        <RNButton title="Logout" onPress={() => setModalVisible(true)} />
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
    flex: 2
  }
});

// export default DrawerContent;
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    naloxoneAvailability: state.userData.naloxoneAvailability
  }
}

export default connect(mapStateToProps, { setStatus })(DrawerContent);
