import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet } from "react-native";
import View from "./View";

const Banner = (props) => {
  return (
    <View {...props} style={{...bannerStyles.view, ...props.style}}>{props.children}</View>
  );
};

/* Styles */

const bannerStyles = StyleSheet.create({
  view: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.layout.padding
  }
});

export default Banner;