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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // height: theme.layout.bannerHeight,
    padding: theme.layout.padding,
    overflow: "hidden",
  },
});

export default Banner;