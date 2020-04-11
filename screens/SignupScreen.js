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
import accountRules from "../constants/accountRules";


class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      phoneNumber: "",
      username: "",
      password: "",
    }
    this.state = {
      ...this.initialState,
      inputIsValid: {
        phoneNumber: true,
        username: true,
        password: true
      },
      signupAttempted: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (   (this.state.phoneNumber !== prevState.phoneNumber)
        || (this.state.username !== prevState.username)
        || (this.state.password !== prevState.password)
        || (this.state.signupAttempted != prevState.signupAttempted)) {
      this.setState({inputIsValid: this.checkIfInputIsValid(this.state.signupAttempted)});
    }
  }

  checkIfInputIsValid = (signupAttempted) => {
    const {phoneNumber, username, password} = this.state;
    let inputIsValid = {
      phoneNumber: (!signupAttempted && phoneNumber === "") || ((typeof phoneNumber !== "undefined") && (accountRules.phoneNumber.regex.test(phoneNumber))),
      username: (!signupAttempted && username === "") || ((typeof username !== "undefined") && (accountRules.username.regex.test(username))),
      password: (!signupAttempted && password === "") || ((typeof password !== "undefined") && (accountRules.password.regex.test(password))),
    };
    return inputIsValid;
  }

  onSignUpButtonPress = () => {
    if (this.state.signupAttempted == false) {
      this.setState({signupAttempted: true});
    }
    const { phoneNumber, username, password } = this.state;
    console.log("[DEBUG] SignUp Button pressed.");
    console.log("\tPhoneNumber: " + phoneNumber + "\n\tUsername: " + username + "\n\tPassword: " + password);
    const inputIsValidAndFilled = this.checkIfInputIsValid(true);
    if (!inputIsValidAndFilled.phoneNumber || !inputIsValidAndFilled.username || !inputIsValidAndFilled.password) {
      console.log("Signup rejected");
      this.setState({inputIsValid: inputIsValidAndFilled});
    } else {
      console.log("Signp accepted");
      this.props.setLoading(true);
      this.props.signupHandler({
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
              <Input variant="number"
                label="Phone Number"
                ref={(input) => phoneNumberInputRef = input}
                hasNext hasError={!this.state.inputIsValid.phoneNumber}
                errorText="Invalid. Example format: 4163403131"
                onChangeText={phoneNumber => {
                  this.setState({ phoneNumber });
                }}
                onSubmitEditing={() => usernameInputRef._root.focus()}
              />
              <Input variant="text"
                label="Username"
                ref={(input) => usernameInputRef = input}
                hasNext hasError={!this.state.inputIsValid.username}
                errorText="Must be 5-20 characters."
                onChangeText={username => {
                  this.setState({ username });
                }}
                onSubmitEditing={() => passwordInputRef._root.focus()}
              />
              <Input variant="password"
                label="Password"
                hasError={!this.state.inputIsValid.password}
                errorText="Must be 5-20 characters."
                ref={(input) => passwordInputRef = input}
                onChangeText={password => {
                  this.setState({ password });
                }}
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