import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox } from "native-base";

const Checkbox = (props) => {
  const combinedIconProps = {
    ...iconProps,
    name: props.checked? "md-checkbox" : "md-square-outline"
  }

  return (
    <TouchableOpacity {...props} onPress={props.onPress} style={[checkboxStyles.checkbox, props.style]}>
      <Ionicons {...combinedIconProps} />
    </TouchableOpacity>
  );
}

/* Prop Types */

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
}

/* Props */

const iconProps = {
  color: theme.colors.darkGrey,
  size: theme.iconSizes.body,
}

/* Styles */ 

const checkboxStyles = StyleSheet.create({
  checkbox: {
    padding: theme.layout.padding,
    paddingRight: theme.layout.margin
  }
});

export default Checkbox;