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

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      email: "",
      username: "",
      password: "",
      emailIsValid: false,
      phoneNumberIsValid: false,
      usernameIsValid: false,
      passwordIsValid: false
      // inputIsValid: {
      //   email: true,
      //   phoneNumber: true,
      //   username: true,
      //   password: true
      // },
      // signupAttempted: false
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (   (this.state.email !== prevState.email)
  //       || (this.state.phoneNumber !== prevState.phoneNumber)
  //       || (this.state.username !== prevState.username)
  //       || (this.state.password !== prevState.password)
  //       || (this.state.signupAttempted != prevState.signupAttempted)) {
  //     this.setState({inputIsValid: this.checkIfInputIsValid(this.state.signupAttempted)});
  //   }
  // }

  // checkIfInputIsValid = (signupAttempted) => {
  //   const {email, phoneNumber, username, password} = this.state;
  //   let inputIsValid = {
  //     email: (!signupAttempted && email === "") || ((typeof email !== "undefined") && (accountRules.email.regex.test(email))),
  //     phoneNumber: (!signupAttempted && phoneNumber === "") || ((typeof phoneNumber !== "undefined") && (accountRules.phoneNumber.regex.test(phoneNumber))),
  //     username: (!signupAttempted && username === "") || ((typeof username !== "undefined") && (accountRules.username.regex.test(username))),
  //     password: (!signupAttempted && password === "") || ((typeof password !== "undefined") && (accountRules.password.regex.test(password))),
  //   };
  //   return inputIsValid;
  // }

  allInputsValid = () => {
    const { emailIsValid, phoneNumberIsValid, usernameIsValid, passwordIsValid } = this.state;
    return (emailIsValid && phoneNumberIsValid && usernameIsValid && passwordIsValid);
  }

  onSignUpButtonPress = () => {
    // if (this.state.signupAttempted == false) {
    //   this.setState({signupAttempted: true});
    // }
    const { email, phoneNumber, username, password } = this.state;
    console.log("[DEBUG] SignUp Button pressed.");
    console.log("\tEmail: " + email + "\n\tPhoneNumber: " + phoneNumber + "\n\tUsername: " + username + "\n\tPassword: " + password);
    // const inputIsValidAndFilled = this.checkIfInputIsValid(true);
    // if (!inputIsValidAndFilled.email || !inputIsValidAndFilled.phoneNumber || !inputIsValidAndFilled.username || !inputIsValidAndFilled.password) {
    if (!this.allInputsValid()) {
      console.log("Signup rejected");
      // this.setState({inputIsValid: inputIsValidAndFilled});
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
                // hasError={!this.state.inputIsValid.email}
                // errorText="Email format is invalid."
                // onChangeText={email => {
                //   this.setState({ email });
                // }}
                constraints={accountConstraints.signup.email}
                onChangeText={(email, emailIsValid) => {this.setState({email, emailIsValid})}}
                onSubmitEditing={() => phoneNumberInputRef._root.focus()}
              />
              <Input variant="number"
                label="Phone Number"
                ref={(input) => phoneNumberInputRef = input}
                hasNext
                // hasError={!this.state.inputIsValid.phoneNumber}
                // errorText="Invalid. Example format: 4163403131"
                // onChangeText={phoneNumber => {
                //   this.setState({ phoneNumber });
                // }}
                constraints={accountConstraints.signup.phoneNumber}
                onChangeText={(phoneNumber, phoneNumberIsValid) => {this.setState({phoneNumber, phoneNumberIsValid})}}
                onSubmitEditing={() => usernameInputRef._root.focus()}
              />
              <Input variant="text"
                label="Username"
                ref={(input) => usernameInputRef = input}
                hasNext
                // hasError={!this.state.inputIsValid.username}
                // errorText="Must be 5-20 characters."
                // onChangeText={username => {
                //   this.setState({ username });
                // }}
                constraints={accountConstraints.signup.username}
                onChangeText={(username, usernameIsValid) => {this.setState({username, usernameIsValid})}}
                onSubmitEditing={() => passwordInputRef._root.focus()}
              />
              <Input variant="password"
                label="Password"
                ref={(input) => passwordInputRef = input}
                // hasError={!this.state.inputIsValid.password}
                // errorText="Must be 5-20 characters."
                // onChangeText={password => {
                //   this.setState({ password });
                // }}
                constraints={accountConstraints.signup.password}
                onChangeText={(password, passwordIsValid) => {this.setState({password, passwordIsValid})}}
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