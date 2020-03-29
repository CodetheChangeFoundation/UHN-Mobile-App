import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import { Form, Input, Spinner } from "../components/forms";
import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';
import { signupHandler, setLoading } from '../store/actions';
import { connect } from 'react-redux';
import accountRules from "../constants/accountRules";
import accountConstraints from "../constants/accountConstraints";
import validate from "validate.js";

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      emailError: null,
      phoneNumberError: null,
      usernameError: null,
      passwordError: null
    };
  }

  validateInputs = () => {
    const { email, phoneNumber, username, password } = this.state;
    return validate({email, phoneNumber, username, password}, accountConstraints.signup, {fullMessages: false});
  }

  onSignUpButtonPress = () => {
    const validationError = this.validateInputs();
    console.log("validationError:", validationError)
    const { email, phoneNumber, username, password } = this.state;
    console.log("[DEBUG] SignUp Button pressed.");
    console.log("\tEmail: " + email + "\n\tPhoneNumber: " + phoneNumber + "\n\tUsername: " + username + "\n\tPassword: " + password);
    if (!!validationError) {
      console.log("Signup rejected");
      this.setState({emailError: validationError.email, phoneNumberError: validationError.phoneNumber,
        usernameError: validationError.username, passwordError: validationError.password});
    } else {
      console.log("Signup accepted");
      this.props.setLoading(true);
      this.props.signupHandler({
        email: email,
        phone: phoneNumber,
        username: username,
        password: password,
      });
    }
  }

  renderSignUpButtonOrSpinner = () => {
    return (this.props.auth.loading) ?
      (<Spinner />)
      :
      (<Button variant="dark" size="medium" onPress={this.onSignUpButtonPress}>
        sign up
        </Button>
      );
  }

  render() {
    let usernameInputRef = React.createRef();
    let passwordInputRef = React.createRef();
    return (
      <Container>
        <Header leftButton="arrow" 
        onLeftButtonPress={() => Actions.pop()}
        >
          Sign Up
        </Header>

        <Content>
          <Form>
            <View style={styles.title}>
              <Text variant="title">Create your account</Text>
            </View>
            <View style={styles.loginInfo}>
              <Input variant="email"
                label="Email"
                hasNext
                onChangeText={email => {
                  this.setState({ email, emailError: validate.single(email, accountConstraints.signup.email) });
                }}
                validationError={this.state.emailError?.[0]}
                onSubmitEditing={() => phoneNumberInputRef._root.focus()}
              />
              <Input variant="number"
                label="Phone Number"
                ref={(input) => phoneNumberInputRef = input}
                hasNext
                onChangeText={phoneNumber => {
                  this.setState({ phoneNumber, phoneNumberError: validate.single(phoneNumber, accountConstraints.signup.phoneNumber) });
                }}
                validationError={this.state.phoneNumberError?.[0]}
                onSubmitEditing={() => usernameInputRef._root.focus()}
              />
              <Input variant="text"
                label="Username"
                ref={(input) => usernameInputRef = input}
                hasNext
                onChangeText={username => {
                  this.setState({ username, usernameError: validate.single(username, accountConstraints.signup.username) });
                }}
                validationError={this.state.usernameError?.[0]}
                onSubmitEditing={() => passwordInputRef._root.focus()}
              />
              <Input variant="password"
                label="Password"
                ref={(input) => passwordInputRef = input}
                onChangeText={password => {
                  this.setState({ password, passwordError: validate.single(password, accountConstraints.signup.password) });
                }}
                validationError={this.state.passwordError?.[0]}
                onSubmitEditing={this.onSignUpButtonPress}
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
    flex: 1,
  },
  message: {
    flex: 0,
    justifyContent: "flex-start",
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { signupHandler, setLoading })(SignupScreen);