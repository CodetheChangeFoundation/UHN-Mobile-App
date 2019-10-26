import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../styles/base'
import { Text as RNText, StyleSheet } from 'react-native';
import { Title, Text as NBText } from 'native-base';

const Text = (props) => {
  return (
      <NBText style={[textStyles[props.variant], props.style]}>{props.children}</NBText>
  );
}

/* Prop Types */

Text.propTypes = {
  variant: PropTypes.oneOf([ 'body', 'header', 'primary', 'secondary', 'alarm', 'urgent']),
};

Text.defaultProps = {
  variant: 'body',
};

/* Styles */

const body = {
  fontFamily: theme.fonts.body,
  fontSize: theme.fontSizes.medium,
}

const header = {
  fontFamily: theme.fonts.header,
  fontSize: theme.fontSizes.large,
}

const textStyles = StyleSheet.create({
  body: {
      ...body,
      color: theme.colors.darkGrey,
  },
  title: {
      ...header,
      color: theme.colors.lightGrey,
  },
  header: {
      ...header,
      color: theme.colors.white,
  },
  primary: {
      ...body,
      color: theme.colors.white,
  },
  secondary: {
      ...body,
      color: theme.colors.lightGrey,
  },
  alarm: {
      ...body,
      fontSize: theme.fontSizes.large,
      color: theme.colors.white,
  },
  urgent: {
      ...body,
      fontSize: theme.fontSizes.large,
      color: theme.colors.white,
  },
});

export default Text;