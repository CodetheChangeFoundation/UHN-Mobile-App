import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base"
import { StyleSheet } from "react-native";
import { Text as NBText } from "native-base";

const Text = (props) => {
  return (
    <NBText {...props} style={{...textStyles[props.variant], ...props.style}}>{props.children}</NBText>
  );
};

/* Prop Types */

Text.propTypes = {
  variant: PropTypes.oneOf([ "body", "footnote", "title", "header", "label"])
};

Text.defaultProps = {
  variant: "body"
};

/* Styles */

const regular = {
  fontFamily: theme.fonts.body,
  fontSize: theme.fontSizes.medium,
  color: theme.colors.darkGrey
};

const big = {
  fontFamily: theme.fonts.header,
  fontSize: theme.fontSizes.large,
  color: theme.colors.darkGrey
};

const textStyles = StyleSheet.create({
  body: {
    ...regular
  },
  footnote: {
    ...regular,
    fontSize: theme.fontSizes.small
  },
  title: {
    ...big,
    textAlign: "center"
  },
  header: {
    ...big,
    color: theme.colors.white
  },
  label: {
    ...regular,
    fontSize: theme.fontSizes.xsmall,
    textAlign: "center"
  }
});

export default Text;