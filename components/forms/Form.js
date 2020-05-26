import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet } from "react-native";
import { Form as NBForm } from "native-base";

const Form = (props) => {
  return (
      <NBForm {...props} style={{...formStyles.form, ...props.style}}>{props.children}</NBForm>
  );
};

/* Styles */

const formStyles = StyleSheet.create({
  form: {
    flex: 1,
    padding: theme.layout.padding
  }
});

export default Form;