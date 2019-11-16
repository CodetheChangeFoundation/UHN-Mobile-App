import React, { Component } from "react";
import {
  StyleSheet,
  Button
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";

const ResourceScreen = () => {
  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Resources</Header>

    <Content>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Resource Screen
        </Text>
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
    backgroundColor: "magenta",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default ResourceScreen;