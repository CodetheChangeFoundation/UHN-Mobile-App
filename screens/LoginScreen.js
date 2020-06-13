import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../styles/base"
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button, Switch } from "../components/buttons";
import { Form, Input } from "../components/forms";
import { connect } from "react-redux";
import { loginHandler, setLoading, setLocalLocation, setStatus } from "../store/actions";
import { promptLocationPermissions } from "../utils/index";
import { startLocationTask } from "../services/task-manager";

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      rememberMe: false
    };
  }

  setRememberMe = () => {
    if (this.state.rememberMe) {
      this.setState({ rememberMe: false });
    } else {
      this.setState({ rememberMe: true });
    }
  }

  onLoginButtonPress = async () => {
    const { username, password, rememberMe } = this.state;
    console.log("[DEBUG] LOGIN Button pressed.");
    console.log("[DEBUG] username is " + username + ", password is " + password);
    await promptLocationPermissions();
    await startLocationTask();
    this.props.setLoading(true);
    this.props.loginHandler({ username: username, password: password }, rememberMe);
  }

  render() {
    let passwordInputRef = React.createRef();

    return (
      <Container>
        <Header>Hello</Header>

        <Content>
          <Form>
            <View style={styles.loginInfo}>
              <Input variant="text"
                label="Username"
                hasNext
                onChangeText={username => {
                  this.setState({ username: username });
                }}
                onSubmitEditing={() => passwordInputRef._root.focus()}
              />
              <Input variant="password"
                label="Password"
                ref={(input) => passwordInputRef = input}
                onChangeText={password => {
                  this.setState({ password: password });
                }}
                onSubmitEditing={this.onLoginButtonPress}
              />
            </View>

            <View style={styles.rememberMe}>
              <Text variant="footnote">remember me</Text>
              <Switch style={styles.rememberMeSwitch}
                value={this.state.rememberMe}
                onValueChange={() => this.setRememberMe()}
              />
            </View>

            <View style={styles.buttons}>
              <Button
                variant="dark"
                size="medium"
                onPress={this.onLoginButtonPress}
                disabled={this.props.auth.loading}
                loadingText="wait..."
              >
                login
              </Button>
              <Button variant="light" size="medium" onPress={() => Actions.signup()}>sign up</Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginInfo: {
    flex: 0,
  },
  rememberMe: {
    flex: 0,
    flexDirection: "row",
    marginBottom: theme.layout.margin,
    alignSelf: "flex-end",
    justifyContent: "flex-start"
  },
  rememberMeSwitch: {
    marginLeft: theme.layout.margin,
  },
  buttons: {
    justifyContent: "space-around"
  }
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { loginHandler, setLoading, setLocalLocation, setStatus })(LoginScreen);