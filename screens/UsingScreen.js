import React, { Component } from "react";
import {
  StyleSheet
} from "react-native";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer";
import { Container, Content, Header, View, Segment, Banner } from "../components/layout";
import { Button } from "../components/buttons";
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
      <Banner />
    
      <View style={styles.timer}>
        <Timer using={false}/>
      </View>

      <View>
        <Button variant="alarm" onPress={() => Actions.alarm()}>start</Button>
      </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  timer: {
    flex: 0,
  }
});

export default UsingScreen;