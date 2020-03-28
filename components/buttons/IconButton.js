import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../layout";
import { Text } from "../typography";
import { Icon } from "native-base";

const IconButton = (props) => {
  const combinedProps = {
    ...iconButtonProps,
    ...props,
  };

  const iconButtonContent = {
    icon: (
      <Icon name={props.name} style={[iconButtonStyles.icon, {fontSize: props.size}]}>{props.children}</Icon>
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
      {(props.label)? <Text variant="label">{props.label}</Text> : null}
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
  name: "md-pin",
  size: 42,
  counterValue: 0,
};

/* Props */

const iconButtonProps = {
  activeOpacity: theme.buttons.buttonPressOpacity,
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
  icon: {
    color: theme.colors.green,
  },
  counterView: {
    alignSelf: "stretch",
    backgroundColor: theme.colors.green,
  },
});

export default IconButton;