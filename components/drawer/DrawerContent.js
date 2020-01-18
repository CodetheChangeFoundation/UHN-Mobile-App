import React, { useState, Fragment } from "react";
import { StyleSheet, Button as RNButton } from "react-native";
import { Actions } from "react-native-router-flux";
import { Modal } from "../popups";
import { View } from "../layout";
import { Button } from "../buttons";
import { Text } from "../typography";

const DrawerContent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const modalHeader="Logout";
  const modalBody = (<Text>Are you sure?</Text>);
  const modalFooterLeft = (<Button variant="secondary" onPress={() => setModalVisible(false)}>Cancel</Button>);
  const modalFooterRight = (<Button variant="primary" onPress={() => Actions.auth()}>Logout</Button>);
  
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
  )
}

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
})

export default DrawerContent;