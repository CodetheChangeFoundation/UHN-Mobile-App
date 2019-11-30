import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import { Form, Input } from "../components/forms";
import Spinner from "../components/forms/Spinner";
import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';
import { signupHandler, setLoading } from '../store/actions';
import { connect } from 'react-redux';


class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      phoneNumber: "",
      email: "",
      username: "",
      password: "",
    }
    this.state = this.initialState;
    this.renderSignUpButtonOrSpinner = this.renderSignUpButtonOrSpinner.bind(this);
    this.onSignUpButtonPress = this.onSignUpButtonPress.bind(this);
  }

  onSignUpButtonPress() {
    const { email, phoneNumber, username, password } = this.state;
    console.log("[DEBUG] SignUp Button pressed.");
    console.log("[DEBUG] username is " + username + ", password is " + password + "\n email is " + email + " phoneNum is " + phoneNumber);
    // TODO: generate error if username or password is empty string
    this.props.setLoading(true);
    this.props.signupHandler({
      email: email,
      phone: phoneNumber,
      username: username,
      password: password,
    });
  }

  renderSignUpButtonOrSpinner() {
    return (this.props.auth.loading) ?
      (<Spinner />)
      :
      (<Button variant="primary" onPress={this.onSignUpButtonPress}>
        sign up
        </Button>
      );
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
              />
            </View>
            <View style={styles.signupButton}>
              {this.renderSignUpButtonOrSpinner()}
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
  },
  message: {
    flex: 3,
    justifyContent: "flex-start",
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { signupHandler, setLoading })(SignupScreen);