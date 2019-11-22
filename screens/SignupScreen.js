import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import { Form, Input } from "../components/forms";
import * as axios from 'axios';

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      email: "",
      username: "",
      password: "",
      loading: false
    }
    this.onSignUpButtonPress = this.onSignUpButtonPress.bind(this);
    this.onSignUpSuccess = this.onSignUpSuccess.bind(this);
    this.onSignUpFailed = this.onSignUpFailed.bind(this);
  }

  onSignUpButtonPress() {
    const { email, phoneNumber, username, password } = this.state;
    console.log("[DEBUG] SignUp Button pressed.");
    console.log("[DEBUG] username is " + username + ", password is " + password + "\n email is " + email + " phoneNum is " + phoneNumber);
    // TODO: generate error if username or password is empty string


    // firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then(this.onLoginSuccess.bind(this))
    //     .catch(() => {
    //         firebase.auth().createUserWithEmailAndPassword(email,password)
    //             .then(this.onLoginSuccess.bind(this))
    //             .catch(this.onLoginFailed.bind(this));
    //     });
    axios.post('http://localhost:3000/signup', {
      email: email,
      phone: phoneNumber,
      username: username,
      password: password,
    }).then(this.onSignUpSuccess)
    .catch(this.onSignUpFailed);

    Actions.login();
  }

  onSignUpSuccess(response) {
    console.log(response);
  }

  onSignUpFailed(error) {
    console.log(error);
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
              <Input variant="text"
                label="Email"
                hasNext
                onChangeText={email => {
                  this.setState({ email: email });
                  console.log(this.state.email);
                }}
                onSubmitEditing={() => phoneNumberInputRef._root.focus()}
              />
              <Input variant="number"
                label="Phone Number"
                ref={(input) => phoneNumberInputRef = input}
                hasNext
                onChangeText={phoneNumber => {
                  this.setState({ phoneNumber: phoneNumber });
                  console.log(this.state.phoneNumber);
                }}
                onSubmitEditing={() => usernameInputRef._root.focus()}
              />
              <Input variant="text"
                label="Username"
                ref={(input) => usernameInputRef = input}
                hasNext
                onChangeText={username => {
                  this.setState({ username: username });
                  console.log(this.state.username);
                }}
                onSubmitEditing={() => passwordInputRef._root.focus()}
              />
              <Input variant="text"
                label="Password"
                ref={(input) => passwordInputRef = input}
                onChangeText={password => {
                  this.setState({ password: password });
                  console.log(this.state.password);
                }}
              //onSubmitEditing={() => Actions.login()}
              />
            </View>

            <View style={styles.signupButton}>
              <Button variant="primary" onPress={this.onSignUpButtonPress}>sign up</Button>
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