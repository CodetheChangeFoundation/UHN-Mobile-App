import React, { Fragment } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Actions } from "react-native-router-flux";


const DrawerContent = () => {
  return (
    <Fragment>
      <View style={styles.topContainer}>
        <Text>Logo here</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Button title="Using" onPress={() => Actions.using()} />
        <Button title="Responding" onPress={() => Actions.responding()} />
        <Button title="User Profile" onPress={() => Actions.profile()} />
        <Button title="Resource" onPress={() => Actions.resource()} />
        <Button title="Logout" onPress={() => Actions.auth()} />
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