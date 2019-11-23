import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base"
import { StyleSheet, View } from "react-native";
import Text from "./Text";

const Username = (props) => {
  return (
      <View {...props} style={[usernameStyles.view, props.style]}>
        <Text style={usernameStyles.text}>{props.children}</Text>
      </View>
  );
}

/* Styles */

const usernameStyles = StyleSheet.create({
  view: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
    margin: 0,
    alignItems: "flex-start",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingLeft: theme.layout.margin,
  },
  text: {
    fontFamily: theme.fonts.header,
    color: theme.colors.lightGrey
  }
});

export default Username;