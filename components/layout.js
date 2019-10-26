import React from 'react';
import PropTypes from 'prop-types';
import theme from '../styles/base';
import { View as RNView, StyleSheet } from 'react-native';
import { Container, Header, Content } from 'native-base';

export const View = (props) => {
  return (
      <Container style={[viewStyles.container, props.styles]}>{props.children}</Container>
  );
}

/* Styles */

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    paddingTop: 20,
  },
});
