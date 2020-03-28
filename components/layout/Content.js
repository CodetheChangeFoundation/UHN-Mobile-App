import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet } from "react-native";
import { Content as NBContent } from "native-base";

const Content = (props) => {
  return (
      <NBContent {...props} contentContainerStyle={{...contentStyles.content, ...props.style}}>{props.children}</NBContent>
  );
}

/* Styles */

const contentStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: (theme.layout.padding + theme.layout.margin)
  }
});

export default Content;