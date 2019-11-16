import React, { Component } from "react";
import {
  StyleSheet,
  Button
} from "react-native";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";

const UsingScreen = () => {
  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Using Mode</Header>

    <Content>
      <View style={styles.container}>
        <Timer using={false}/>
        <Text style={styles.welcome}>
          Using Screen
        </Text>
        <Button title="Responding" onPress={() => Actions.responding()} />
        <Button title="Start" onPress={() => Actions.alarm()} />
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
    backgroundColor: "pink",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default UsingScreen;