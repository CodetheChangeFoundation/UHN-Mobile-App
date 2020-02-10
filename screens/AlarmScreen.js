import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer"
import { Container, Content, Header, View } from "../components/layout";
import { Button } from "../components/buttons"
import { Text } from "../components/typography";

const AlarmScreen = (props) => {

  const { time, userId } = props
  const { timeRemaining } = time

  useEffect(() => {
    // send help_request here
  }, [props.timeRemaining])
  
  return (
    <Container>
    <Header
      leftButton="arrow" 
      onLeftButtonPress={() => Actions.main()}
    >Counting down</Header>

    <Content>
      
      <View style={styles.container}>
        <Timer isUsing={true}/>
        <Text style={styles.welcome}>
          Alarm Screen
        </Text>
        {
          timeRemaining < 15 &&
          <Button variant="primary" onPress={() => Actions.snooze()}>I'm out of time!</Button>
        }
        <View style={styles.button}>
          <Button variant="urgent" onPress={() => console.log('help!')}>help now!</Button>
        </View>
      </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
  button: {
    position: "absolute",
    bottom: 30,
  }
});

function mapStateToProps(state) {
  return {
    time: state.timer,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps)(AlarmScreen);