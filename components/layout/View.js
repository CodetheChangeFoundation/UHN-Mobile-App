import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, View as RNView } from "react-native";
import { View as NBView } from "native-base";

const View = (props) => {
  return (
    <NBView {...props} style={[viewStyles.view, props.style]}>{props.children}</NBView>
  );
}

/* Styles */

const viewStyles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default View;
