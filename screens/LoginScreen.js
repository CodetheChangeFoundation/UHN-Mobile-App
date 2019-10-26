import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
// import { Container } from '../components/layout/Container';
// import { Content } from '../components/layout/Content';
// import { Header } from '../components/layout/Header';
import { Container, Content, Header } from "../components/layout";
import { Text } from '../components/typography/Text';
import { Button } from '../components/buttons/Button';
import { Form } from '../components/forms/Form';
import { Input } from '../components/forms/Input';

const LoginScreen = () => {
  return (
    <Container>
    <Header>Hello</Header>

    <Content>
    <Form>
      <View style={styles.loginInfo}>
        <Input variant='text' label='Username' />
        <Input variant='text' label='Password' />
      </View>

      <View style={styles.rememberMe}>
        <Text>remember me</Text>
        <Icon ios='ios-add' android='md-add' />
      </View>

      <View style={styles.loginButton}>
        <Button variant='primary' onPress={() => Actions.main()}>login</Button>
      </View>

      <View style={styles.signupButton}>
        <Button variant='secondary' onPress={() => Actions.signup()}>sign up</Button>
      </View>
    </Form>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  loginInfo: {
    flex: 4,
  },
  rememberMe: {
    flex: 1,
    flexDirection: 'row',
    padding: 18,
    alignSelf: 'flex-end',
  },
  loginButton: {
    flex: 4,
    alignSelf: 'center',
  },
  signupButton: {
    flex: 2,
    alignSelf: 'center',
  }
});

export default LoginScreen;