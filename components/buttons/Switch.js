import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, Switch as RNSwitch, Platform } from "react-native";

const Switch = (props) => {
  return (
    <RNSwitch
      {...{...props, ...switchProps}} 
      thumbColor={props.value? theme.colors.green : theme.colors.lightGrey}
      style={props.style}
    />
  );
}

/* Prop Types */

Switch.propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired
};

Switch.defaultProps = {
  value: false
};

/* Props */ 

const switchProps = {
  trackColor: {
    false: (Platform.OS === "ios")? theme.colors.white : theme.colors.fadedGrey,
    true: (Platform.OS === "ios")? theme.colors.white : theme.colors.fadedGreen
  },
  ios_backgroundColor: theme.colors.white,
  height: 24,
  width: 42,
  borderWidth: 1,
  borderRadius: 16,
  borderColor: theme.colors.lightGrey
}

export default Switch;