import React, { Component } from "react";
import {
  StyleSheet,
  Button
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, Segment, Banner } from "../components/layout";
import { Text } from "../components/typography";

const RespondingScreen = () => {
  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Responding Mode</Header>

    <Content>
      <Banner>
        <Segment active="right"
          leftText="using" rightText="responding"
          onLeftButtonPress={() => Actions.using()}/>
      </Banner>

      <View style={styles.container}>
        <Text style={styles.welcome}>
          Responding Screen
        </Text>
        <Button title="Using" onPress={() => Actions.using()} />
      </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default RespondingScreen;