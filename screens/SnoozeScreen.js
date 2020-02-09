import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button } from "../components/buttons";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";

const SnoozeScreen = () => {
  return (
    <Container>
      <Header>Snooze Mode</Header>
      <Content>
        <View style={styles.container, {backgroundColor: "#ffa500"}}>
          <Text style={styles.textStyle}> 
            your responders{"\n"}will be notified in:
          </Text>
          <Text style={styles.numberStyle}>
            15
          </Text>
          <Button variant="snooze" onPress={() => Actions.alarm()}>
            snooze
          </Button>
          <Text style={styles.textStyle}>
            We'll check up on your in 2 minutes
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
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold", 
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
  numberStyle: {
    fontSize: 72, 
    fontWeight: "bold", 
    color: "#ffffff",
    textAlign: "center",
    paddingTop: 60,
    paddingBottom: 60
  },
});

export default SnoozeScreen;