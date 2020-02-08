import React, { Fragment } from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, Platform } from "react-native";
import { Item, Input as NBInput, Label } from "native-base";
import { Text } from "../typography";

const Input = React.forwardRef((props, ref) => {
  const combinedProps = {
    ...inputProps[props.variant],
    returnKeyType: props.hasNext? "next" : "done",
    blurOnSubmit: props.hasNext? false : true,
    ...props,
  };

  let combinedStyles = inputStyles;
  if (props.hasError) {
    combinedStyles = {...inputStyles, ...errorInputStyles}
  }

  return (
    <Fragment>
    <Item floatingLabel {...combinedProps.item} last={props.last} style={combinedStyles.item}>
      <Label style={combinedStyles.label}>{props.label}</Label>
      <NBInput {...combinedProps} style={[combinedStyles.input, props.style]} getRef={ref}/>
    </Item>
    <Text style={combinedStyles.text}>{props.errorText}</Text>
    </Fragment>
  );
});

/* Prop Types */

Input.propTypes = {
  variant: PropTypes.oneOf([ "text", "email", "number"]),
  label: PropTypes.string.isRequired,
  hasNext: PropTypes.bool,
  hasError: PropTypes.bool,
  errorText: PropTypes.string
};

Input.defaultProps = {
  variant: "text",
  hasNext: false,
  hasError: false,
  errorText: "Error detected.",
};

/* Props */

const baseProps = {
  item: {
    placeholderTextColor: theme.colors.darkGrey,
  }
};

const inputProps = {
  text: {
    ...baseProps,
    autoCapitalize: "none",
    autoCorrect: false,
  },
  email: {
    ...baseProps,
    keyboardType: "email-address",
  },
  number: {
    ...baseProps,
    keyboardType: (Platform.OS == "ios")? "numbers-and-punctuation" : "phone-pad",
  },
};

/* Styles */

const baseStyles = {
  fontFamily: theme.fonts.body,
  fontSize: theme.fontSizes.medium,
  color: theme.colors.darkGrey,
}

const inputStyles = StyleSheet.create({
  item: {
    ...baseStyles,
    marginTop: theme.layout.margin,
  },
  label: {
    ...baseStyles,
    fontSize: theme.fontSizes.small,
  },
  input: {
    ...baseStyles,
  },
  text: {
    ...baseStyles,
    fontSize: theme.fontSizes.xsmall,
    flex: 0,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    marginLeft: 2,
    paddingLeft: 2,
    height: 0,
  }
});

const errorInputStyles = StyleSheet.create({
  item: {
    ...inputStyles.item,
    borderBottomColor: theme.colors.red,
  },
  text: {
    ...inputStyles.text,
    backgroundColor: "rgb(255, 230, 230)",
    color: theme.colors.darkGrey,
    height: "auto"
  }
});

export default Input;