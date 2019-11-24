import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../layout";
import { Text } from "../typography";
import { Ionicons } from "@expo/vector-icons";

const IconButton = (props) => {
  const combinedProps = {
    ...iconButtonProps,
    ...props,
  };

  const combinedIconProps = {
    ...iconProps,
    name: props.name,
  };

  const iconButtonContent = {
    icon: (
      <Ionicons {...combinedIconProps}>{props.children}</Ionicons>
    ),
    counter: (
      <View style={iconButtonStyles.counterView}>
        <Text variant="header">{props.counterValue}</Text>
      </View>
    ),
  };
  const content = iconButtonContent[props.variant];

  return (
    <TouchableOpacity {...combinedProps} style={[iconButtonStyles.touchableOpacity, props.style]}>
      <View style={iconButtonStyles.view}>
          {content}
      </View>
      <Text variant="label">{props.label}</Text>
    </TouchableOpacity>
  );
}

/* Prop Types */

IconButton.propTypes = {
  variant: PropTypes.oneOf(["icon", "counter"]),
  label: PropTypes.string,
  name: PropTypes.string,
  counterValue: PropTypes.number,
};

IconButton.defaultProps = {
  variant: "counter",
  label: "",
  name: "md-pin",
  counterValue: 0,
};

/* Props */

const iconButtonProps = {
  activeOpacity: theme.buttons.buttonPressOpacity,
}

const iconProps = {
  size: 42,
  color: theme.colors.green,
}

/* Styles */

const iconButtonStyles = StyleSheet.create({
  touchableOpacity: {
    alignItems: "center",
  },
  view: {
    flex: 0,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center", 
    justifyContent: "center", 
    overflow: "hidden",
  },
  counterView: {
    alignSelf: "stretch",
    backgroundColor: theme.colors.green,
  },
});

export default IconButton;