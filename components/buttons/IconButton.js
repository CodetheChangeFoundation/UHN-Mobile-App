import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { View } from "../layout";
import { Text } from "../typography";

const IconButton = (props) => {
  // Render the content of the IconButton based on variant
  const iconButtonContent = {
    icon: (
      <Icon name={props.name} style={{fontSize: props.size, color: props.color}}>{props.children}</Icon>
    ),
    counter: (
      <View style={{...iconButtonStyles.counterView, backgroundColor: props.color}}>
        <Text variant="header">{props.counterValue}</Text>
      </View>
    ),
  };
  const content = iconButtonContent[props.variant];

  return (
    <TouchableOpacity {...{...iconButtonProps, ...props}} onPress={props.onPress} style={{...iconButtonStyles.touchableOpacity, ...props.style}}>
      <View style={{...iconButtonStyles.view, width: props.size, height: props.size, borderRadius: props.size}}>
          {content}
      </View>
      {!!(props.label) && <Text variant="label">{props.label}</Text>}
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
  color: PropTypes.string,
  onPress: PropTypes.func,
};

IconButton.defaultProps = {
  variant: "counter",
  name: "md-pin",
  size: 42,
  color: theme.colors.green,
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
    overflow: "hidden"
  },
  counterView: {
    alignSelf: "stretch"
  },
});

export default IconButton;