import React from "react";
import PropTypes from "prop-types";
import theme from "../styles/base"
import { Text as RNText, StyleSheet } from "react-native";
import { Title, Text as NBText } from "native-base";

export const Text = (props) => {
  return (
      <NBText style={[textStyles[props.variant], props.styles]}>{props.children}</NBText>
  );
}

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
  header: {
      ...header,
      color: theme.colors.lightGrey,
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