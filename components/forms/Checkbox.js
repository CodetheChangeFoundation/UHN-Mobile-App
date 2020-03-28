import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox, Icon } from "native-base";

const Checkbox = (props) => {
  const iconProps = {
    name: props.checked? "md-checkbox" : "md-square-outline"
  }

  return (
    <TouchableOpacity {...props} onPress={props.onPress} style={[checkboxStyles.checkbox, props.style]}>
      <Icon {...iconProps} style={checkboxStyles.icon}></Icon>
    </TouchableOpacity>
  );
}

/* Prop Types */

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
}

/* Styles */ 

const checkboxStyles = StyleSheet.create({
  checkbox: {
    padding: theme.layout.padding,
    paddingRight: theme.layout.margin
  },
  icon: {
    color: theme.colors.darkGrey,
    fontSize: theme.iconSizes.body
  }
});

export default Checkbox;