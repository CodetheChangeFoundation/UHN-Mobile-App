import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base"
import { StyleSheet, ScrollView } from "react-native";

const List = (props) => {
  return (
      <ScrollView {...props} style={props.style}>
        {props.children}
      </ScrollView>
  );
}

export default List;