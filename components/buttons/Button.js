import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button as NBButton } from "native-base";
import { Text } from "../typography";

const Button = (props) => {
  const combinedProps = {
    ...buttonProps,
    ...props,
  };

  return (
      <TouchableOpacity {...combinedProps} style={[buttonStyles[props.variant], props.style]}>
          <Text variant={props.variant}>{props.children}</Text>
      </TouchableOpacity>
  );
}

/* Prop Types */

Button.propTypes = {
  variant: PropTypes.oneOf([ "primary", "secondary", "alarm", "urgent"]),
};

Button.defaultProps = {
  variant: "primary",
};

/* Props */

const buttonProps = {
  activeOpacity: theme.buttons.buttonPressOpacity,
}

/* Styles */

const base = {
  margin: theme.layout.margin,
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 1,
}

const medium = {
  height: 54,
  width: 180,
  borderRadius: 54,
}

const large = {
  height: 72,
  width: 240,
  borderRadius: 72,
}

const border = {
  borderWidth: 1,
}

const buttonStyles = StyleSheet.create({
  primary: {
    ...base,
    ...medium,
    backgroundColor: theme.colors.darkGrey,
  },
  secondary: {
    ...base,
    ...medium,
    ...border,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.darkGrey,
  },
  alarm: {
    ...base,
    ...large,
    backgroundColor: theme.colors.green,
  },
  urgent: {
    ...base,
    ...large,
    backgroundColor: theme.colors.red,
  },
});

export default Button;