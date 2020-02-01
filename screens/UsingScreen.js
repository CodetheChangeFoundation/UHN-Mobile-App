import React, { Component } from "react";
import {
  StyleSheet
} from "react-native";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer";
import { Container, Content, Header, View, Segment, Banner } from "../components/layout";
import { Button, IconButton } from "../components/buttons";
import { Text } from "../components/typography";

const UsingScreen = () => {
  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Using Mode</Header>

    <Content>
      <Banner>
        <Segment active="left"
          leftText="using" rightText="responding"
          onRightButtonPress={() => Actions.responding()}
        />
      </Banner>
      <Banner>
        <IconButton variant="icon" name="md-pin" label="current location" />
        <IconButton variant="counter" counterValue={3} label="responders available" onPress={() => Actions.responders()} />
      </Banner>
    
      <View style={styles.timer}>
        <Timer isUsing={false}/>
      </View>

      <View style={styles.startButton}>
        <Button variant="alarm" onPress={() => Actions.alarm()}>start</Button>
      </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  timer: {
    flex: 5,
  },
  startButton: {
    flex: 2,
  },
});

export default UsingScreen;