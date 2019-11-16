import React, { Component } from "react";
import {
  StyleSheet,
  Button
} from "react-native";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer"
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";

const AlarmScreen = () => {
  return (
    <Container>
    <Header>Alarm Mode</Header>

    <Content>
      <View style={styles.container}>
        <Timer using={true}/>
        <Text style={styles.welcome}>
          Alarm Screen
        </Text>
        <Button title="Exit" onPress={() => Actions.main()} />
        <Button title="Out of Time" onPress={() => Actions.snooze()} />
      </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default AlarmScreen;