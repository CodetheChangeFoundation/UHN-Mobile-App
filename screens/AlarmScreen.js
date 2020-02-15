import React, { useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer"
import { Container, Content, Header, View } from "../components/layout";
import { Button } from "../components/buttons"
import { Text } from "../components/typography";
import { sendHelpRequest } from "../services/help-request.service";

const AlarmScreen = (props) => {

  const { time, userId, token } = props
  const { timeRemaining } = time

  useEffect(() => {
    // send help_request here
  }, [props.timeRemaining])

  const sendHelp = () => {
    sendHelpRequest(userId, token)
      .then((response) => {
        Alert.alert("Help request sent", "Help request has been sent to your responder network", [
          { text: 'OK', onPress: () => Actions.main() }
        ], { cancelable: false });
      })
  }
  
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
        <View style={styles.button}>
          <Button variant="urgent" onPress={sendHelp}>help now!</Button>
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
    userId: state.auth.userId,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(AlarmScreen);