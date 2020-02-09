import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base"
import { Text as RNText, StyleSheet } from "react-native";
import { Title, Text as NBText } from "native-base";

const Text = (props) => {
  return (
      <NBText {...props} style={[textStyles[props.variant], props.style]}>{props.children}</NBText>
  );
}

/* Prop Types */

Text.propTypes = {
  variant: PropTypes.oneOf([ "body", "footnote", "title", "header", "primary", "secondary", "alarm", "urgent", "label"]),
};
0
Text.defaultProps = {
  variant: "body",
};

/* Styles */

const regular = {
  fontFamily: theme.fonts.body,
  fontSize: theme.fontSizes.medium,
  color: theme.colors.darkGrey,
}

const big = {
  fontFamily: theme.fonts.header,
  fontSize: theme.fontSizes.large,
  color: theme.colors.darkGrey,
}

const textStyles = StyleSheet.create({
  body: {
    ...regular,
  },
  footnote: {
    ...regular,
    fontSize: theme.fontSizes.small,
    textAlign: "center",
  },
  title: {
    ...big,
    textAlign: "center",
  },
  header: {
    ...big,
    color: theme.colors.white,
  },
  primary: {
    ...regular,
    color: theme.colors.white,
  },
  secondary: {
    ...regular,
    color: theme.colors.darkGrey,
  },
  alarm: {
    ...regular,
    fontSize: theme.fontSizes.large,
    color: theme.colors.white,
  },
  urgent: {
    ...regular,
    fontSize: theme.fontSizes.large,
    color: theme.colors.white,
  },
  snooze: {
    ...regular,
    fontSize: theme.fontSizes.large,
    color: theme.colors.black,
    fontWeight: "bold", 
  },
  label: {
    ...regular,
    fontSize: theme.fontSizes.xsmall,
    textAlign: "center",
  },
});

export default Text;