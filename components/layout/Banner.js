import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, View as RNView } from "react-native";
import { View } from "native-base";

const Banner = (props) => {
  return (
    <View {...props} style={[bannerStyles.view, props.style]}>{props.children}</View>
  );
}

/* Styles */

const bannerStyles = StyleSheet.create({
  view: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    height: theme.layout.bannerHeight,
    padding: theme.layout.padding,
    marginBottom: theme.layout.margin,
    overflow: "hidden"
  },
});

export default Banner;