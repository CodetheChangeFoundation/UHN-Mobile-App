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
      passwordIsValid: false,
      refresh: false
    };
  }

  onSignUpButtonPress = () => {
    const { email, phoneNumber, username, password } = this.state;
    const { emailIsValid, phoneNumberIsValid, usernameIsValid, passwordIsValid } = this.state;

    console.log("[DEBUG] SignUp Button pressed.");
    console.log("\tEmail: " + email + "\n\tPhoneNumber: " + phoneNumber + "\n\tUsername: " + username + "\n\tPassword: " + password);

    if (!(emailIsValid && phoneNumberIsValid && usernameIsValid && passwordIsValid)) {
      // Force all Inputs to validate and show error messages
      this.setState({refresh: !this.state.refresh});
    } else {
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
                ref={(input) => emailInputRef = input}
                hasNext
                refresh={this.state.refresh}
                constraints={accountConstraints.signup.email}
                onChangeText={(email, emailIsValid) => {this.setState({email, emailIsValid})}}
                onSubmitEditing={() => phoneNumberInputRef._root.focus()}
              />
              <Input variant="number"
                label="Phone Number"
                ref={(input) => phoneNumberInputRef = input}
                hasNext
                refresh={this.state.refresh}
                constraints={accountConstraints.signup.phoneNumber}
                onChangeText={(phoneNumber, phoneNumberIsValid) => {this.setState({phoneNumber, phoneNumberIsValid})}}
                onSubmitEditing={() => usernameInputRef._root.focus()}
              />
              <Input variant="text"
                label="Username"
                ref={(input) => usernameInputRef = input}
                hasNext
                refresh={this.state.refresh}
                constraints={accountConstraints.signup.username}
                onChangeText={(username, usernameIsValid) => {this.setState({username, usernameIsValid})}}
                onSubmitEditing={() => passwordInputRef._root.focus()}
              />
              <Input variant="password"
                label="Password"
                ref={(input) => passwordInputRef = input}
                refresh={this.state.refresh}
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