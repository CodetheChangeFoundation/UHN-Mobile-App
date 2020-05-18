import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../layout";
import { Text } from "../typography";
import theme from "../../styles/base";

export default function SetTimeButton({ changeTimeHandler, children }) {
  return (
    <View>
      <TouchableOpacity onPress={changeTimeHandler}>
        <Text style={styles.buttonText}>{children} s</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: theme.fontSizes.large
  }
});