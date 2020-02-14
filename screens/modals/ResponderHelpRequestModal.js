import React, { useEffect } from "react";
import {
  StyleSheet,
  Button
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../../components/layout";
import { Text } from "../../components/typography";

const ResponderHelpRequestModal = (props) => {

  useEffect(() => {
    console.log("I got to the modal");
    console.log("notification received: ", JSON.stringify(props.notification))
  })

  return (
    <Container>
    <Content>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Responder Help Request Modal
        </Text>
        <Text>{JSON.stringify(props.notification)}</Text>
        <Button title="Go back to main page" onPress={() => Actions.main()} />
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
    backgroundColor: "cyan",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default ResponderHelpRequestModal;
