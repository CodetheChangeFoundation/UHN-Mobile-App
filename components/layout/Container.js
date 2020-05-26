import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet } from "react-native";
import { Container as NBContainer } from "native-base";

const Container = (props) => {
  return (
      <NBContainer {...props} style={{...containerStyles.container, ...props.style}}>{props.children}</NBContainer>
  );
};

/* Styles */

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: "center"
  }
});

export default Container;