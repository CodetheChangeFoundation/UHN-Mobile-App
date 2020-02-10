import React, { Component } from "react";
import {
  StyleSheet
} from "react-native";
import { Button } from "../components/buttons";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";

const ResourceScreen = () => {
  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Resources</Header>
    <Content>
      <View>
        <Button variant="secondary" style={styles.button}>naloxone injection instructions</Button>
        <Button variant = "secondary" style = {styles.container}>naloxone nasal spray instructions</Button>
        <Button variant = "secondary" style = {styles.container}>call 911</Button>
        <Button variant = "secondary"style = {styles.container}>your rights</Button>
        <Button variant = "primary" style = {styles.container} onPress={() => Actions.main()}>exit</Button>
      </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "12%"
  }
});

export default ResourceScreen;
