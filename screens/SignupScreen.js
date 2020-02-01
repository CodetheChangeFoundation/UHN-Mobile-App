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
      email: "",
      username: "",
      password: "",
    }
    this.state = {
      accountInfo: {...this.initialState},
      inputIsValid: {
        email: true,
        phoneNumber: true,
        username: true,
        password: true
      }
    };
    // this.renderSignUpButtonOrSpinner = this.renderSignUpButtonOrSpinner.bind(this);
    // this.onSignUpButtonPress = this.onSignUpButtonPress.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.accountInfo != prevState.accountInfo) {
      this.checkIfInputValid();
    }
  }

  checkIfInputValid = () => {
    const {email, phoneNumber, username, password} = this.state.accountInfo;
    let inputIsValid = {
      email: email && (accountRules.email.regex.test(email)),
      phoneNumber: phoneNumber && (accountRules.phoneNumber.regex.test(phoneNumber)),
      username: username && (accountRules.username.regex.test(username)),
      password: password && (accountRules.password.regex.test(password)),
    };
    console.log(inputIsValid)
    // console.log("username:", username, ", regex:", accountRules.username.regex, ", matches:", accountRules.username.regex.test(username))
    this.setState({inputIsValid});
  }

  onSignUpButtonPress = () => {
    const { email, phoneNumber, username, password } = this.state.accountInfo;
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

  renderSignUpButtonOrSpinner = () => {
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
                  this.setState({ accountInfo: {email} });
                }}
                onSubmitEditing={() => phoneNumberInputRef._root.focus()}
              />
              <Input variant="number"
                label="Phone Number"
                ref={(input) => phoneNumberInputRef = input}
                hasNext
                onChangeText={phoneNumber => {
                  this.setState({ accountInfo: {phoneNumber} });
                }}
                onSubmitEditing={() => usernameInputRef._root.focus()}
              />
              <Input variant="text"
                label="Username"
                ref={(input) => usernameInputRef = input}
                hasNext
                onChangeText={username => {
                  this.setState({ accountInfo: {username} });
                }}
                onSubmitEditing={() => passwordInputRef._root.focus()}
              />
              <Input variant="text"
                label="Password"
                ref={(input) => passwordInputRef = input}
                onChangeText={password => {
                  this.setState({ accountInfo: {password} });
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