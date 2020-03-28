import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base"
import { StyleSheet, ScrollView } from "react-native";
import View from "./View";

const List = (props) => {
  return (
    <ScrollView {...props} style={[styles.list, props.style]}>
      <View onStartShouldSetResponder={() => true}>
        {props.children}
      </View>
    </ScrollView>
  );
}

/* Styles */

const styles = StyleSheet.create({
  list: {
    alignSelf: "stretch"
  }
});

export default List;