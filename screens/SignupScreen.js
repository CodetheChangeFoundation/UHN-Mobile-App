import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import { Form, Input } from "../components/forms";

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      username: "",
      password: "",
    }
  }
  render() {
    let usernameInputRef = React.createRef();
    let passwordInputRef = React.createRef();
    return (
      <Container>
        <Header>Sign Up</Header>

        <Content>
          <Form>
            <View style={styles.title}>
              <Text variant="title">Create your account</Text>
            </View>

            <View style={styles.loginInfo}>
              <Input variant="number"
                label="Phone Number"
                hasNext
                onSubmitEditing={() => usernameInputRef._root.focus()}
              />
              <Input variant="text"
                label="Username"
                ref={(input) => usernameInputRef = input}
                hasNext
                onSubmitEditing={() => passwordInputRef._root.focus()}
              />
              <Input variant="text"
                label="Password"
                ref={(input) => passwordInputRef = input}
                onSubmitEditing={() => Actions.login()}
              />
            </View>

            <View style={styles.signupButton}>
              <Button variant="primary" onPress={() => Actions.login()}>sign up</Button>
            </View>

            <View style={styles.message}>
              <Text variant="footnote">You'll receive a verification code via text.</Text>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    flex: 0,
  },
  loginInfo: {
    flex: 0,
  },
  signupButton: {
    flex: 2,
    justifyContent: "center",
  },
  message: {
    flex: 3,
  },
});