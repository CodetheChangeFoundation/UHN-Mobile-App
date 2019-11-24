import React, { Component, useState } from "react";
import {
  StyleSheet,
} from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../styles/base"
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button, Switch } from "../components/buttons";
import { Form, Input } from "../components/forms";

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState(true);
  let passwordInputRef = React.createRef();

  _toggleRememberMe = (newValue) => {
    setRememberMe(newValue);
  };

  return (
    <Container>
    <Header>Hello</Header>

    <Content>
    <Form>
      <View style={styles.loginInfo}>
        <Input variant="text" 
          label="Username" 
          hasNext
          onSubmitEditing={() => passwordInputRef._root.focus()}
        />
        <Input variant="text" 
          label="Password" 
          ref={(input) => passwordInputRef = input}
          onSubmitEditing={() => Actions.main()}
        />
      </View>

      <View style={styles.rememberMe}>
        <Text variant="footnote">remember me</Text>
        <Switch style={styles.rememberMeSwitch} value={rememberMe} onValueChange={_toggleRememberMe}/>
      </View>

      <View style={styles.loginButton}>
        <Button variant="primary" onPress={() => Actions.main()}>login</Button>
      </View>

      <View style={styles.signupButton}>
        <Button variant="secondary" onPress={() => Actions.signup()}>sign up</Button>
      </View>
    </Form>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  loginInfo: {
    flex: 0,
  },
  rememberMe: {
    flex: 2,
    flexDirection: "row",
    marginTop: theme.layout.margin,
    alignSelf: "flex-end",
  },
  rememberMeSwitch: {
    marginLeft: theme.layout.margin,
  },
  loginButton: {
    flex: 6,
    justifyContent: "flex-start",
  },
  signupButton: {
    flex: 2,
  }
});

export default LoginScreen;