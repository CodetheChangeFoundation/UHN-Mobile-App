import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../styles/base';
import { StyleSheet } from 'react-native';
import { Item, Input as NBInput, Label } from 'native-base';

const Input = (props) => {
  return (
    <Item floatingLabel last={props.last} style={inputStyles.item}>
      <Label style={inputStyles.label}>{props.label}</Label>
      <NBInput {...inputProps[props.variant]} style={[inputStyles.input, props.style]}/>
    </Item>
  );
}

/* Prop Types */

Input.propTypes = {
  variant: PropTypes.oneOf([ 'text', 'number']),
  label: PropTypes.string.isRequired,
};

Input.defaultProps = {
  variant: 'text',
};

/* Props */

const inputProps = {
  text: {
    autoCapitalize: 'none',
    autoCorrect: false,
  },
  number: {
    keyboardType: 'phone-pad',
  },
};

/* Styles */

const baseStyles = {
  paddingTop: 10,
  paddingBottom: 10,
  marginRight: 15,
  fontFamily: theme.fonts.body,
  fontSize: theme.fontSizes.medium,
  color: theme.colors.darkGrey,
}

const inputStyles = StyleSheet.create({
  item: {
    ...baseStyles,
  },
  label: {
    ...baseStyles,
    fontSize: theme.fontSizes.small,
  },
  input: {
    ...baseStyles,
  },
});

export default Input;