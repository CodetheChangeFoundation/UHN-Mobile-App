import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, ActivityIndicator } from "react-native";
import { View } from "../layout";

const Spinner = (props) => {
  return (
    <View>
      <ActivityIndicator size={props.size} />
    </View>
  );
}

/* Prop Types */

Spinner.propTypes = {
  size: PropTypes.oneOf(["small", "large"])
}

Spinner.defaultProps = {
  size: "large"
}

export default Spinner;