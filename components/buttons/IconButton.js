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
    size: props.size || iconProps.size
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

  // Make button size dynamic
  const buttonStyle = {...iconButtonStyles.view}
  buttonStyle.width = props.size || iconProps.size
  buttonStyle.height = props.size || iconProps.size
  buttonStyle.borderRadius = props.size || iconProps.size

  return (
    <TouchableOpacity {...combinedProps} onPress={props.onPress} style={[iconButtonStyles.touchableOpacity, props.style]}>
      <View style={buttonStyle}>
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
  size: PropTypes.number,
  onPress: PropTypes.func,
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
    width: 0,
    height: 0,
    borderRadius: 0,
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