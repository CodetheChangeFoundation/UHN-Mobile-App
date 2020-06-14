import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "../components/buttons";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import theme from "../styles/base";

const ResourceScreen = () => {
  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Resources</Header>
    <Content>
      <View style={styles.view}>
        <Button variant="light" size="medium" style={styles.button}>naloxone injection instructions</Button>
        <Button variant="light" size="medium" style={styles.button}>naloxone nasal spray instructions</Button>
        <Button variant="light" size="medium" style={styles.button}>call 911</Button>
        <Button variant="light" size="medium" style={styles.button}>your rights</Button>
        <Button variant="dark" size="medium" style={styles.button} onPress={() => Actions.using()}>exit</Button>
      </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingVertical: theme.layout.margin,
    justifyContent: "space-around"
  },
  button: {
    width: "100%"
  }
});

export default ResourceScreen;
