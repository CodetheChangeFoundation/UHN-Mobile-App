import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Timer from "../components/Timer/Timer";
import { Container, Content, Header, View, Banner } from "../components/layout";
import { Button } from "../components/buttons";
import { sendHelpRequest } from "../services/help-request.service";
import { updateAlarmLog } from "../store/actions";

const AlarmScreen = props => {
  const { time, userId, token } = props;
  const { timeRemaining } = time;

  const sendHelp = () => {
    sendHelpRequest(userId, token).then(response => {
      Actions.alert({
        alertTitle: "Help request sent",
        alertBody: "A help request has been sent to your responder network.",
        positiveButton: { text: "OK" },
        cancelable: false
      });

      props.updateAlarmLog(0, true, props.currentAlarmLog, token);
      Actions.main();
    });
  };

  const exitAlarm = () => {
    Actions.alert({
      alertTitle: "Are you sure you want to exit?",
      alertBody: "This will reset the timer.",
      positiveButton: {
        text: "Yes",
        onPress: () => {
          Actions.main();
          props.updateAlarmLog(0, null, props.currentAlarmLog, token);
        }
      },
      negativeButton: {
        text: "No",
        style: "cancel"
      },
      cancelable: false
    });
  };

  return (
    <Container>
      <Header leftButton="arrow" onLeftButtonPress={exitAlarm}>
        Counting down
      </Header>

      <Content>
        <Banner />
        <Banner />

        <View style={styles.timer}>
          <Timer isUsing={true} />
        </View>

        <View style={styles.helpButton}>
          <Button variant="warning" size="large" onPress={sendHelp}>
            help now!
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  timer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  helpButton: {
    flex: 2
  }
});

function mapStateToProps(state) {
  return {
    time: state.timer,
    userId: state.auth.userId,
    token: state.auth.token,
    currentAlarmLog: state.alarm.currentAlarmLog
  };
}

export default connect(mapStateToProps, { updateAlarmLog })(AlarmScreen);
