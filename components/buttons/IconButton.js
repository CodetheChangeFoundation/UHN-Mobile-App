import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { View } from "../layout";
import { Text } from "../typography";

const IconButton = (props) => {
  const [throttle, setThrottle] = useState(false);
  const buttonTimeout = useRef(false);

  useEffect(() => {
    // Clean up
    return () => clearTimeout(buttonTimeout.current);
  }, []);
  
  const onPress = async () => {
    if (!throttle) {
      setThrottle(true);
      await props.onPress();
      buttonTimeout.current = setTimeout(() => setThrottle(false), 300);
    }
  };
  
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

  const disabled = props.disabled || throttle;
  return (
    <TouchableOpacity 
      {...props}
      activeOpacity={theme.buttons.buttonPressOpacity}
      onPress={onPress}
      disabled={disabled}
      style={{
        ...iconButtonStyles.touchableOpacity,
        ...props.style,
        opacity: disabled? theme.buttons.buttonPressOpacity : 1
      }}
    >
      <View style={{
        ...iconButtonStyles.view,
        width: props.size,
        height: props.size,
        borderRadius: props.size
      }}>
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
  onPress: PropTypes.func
};

IconButton.defaultProps = {
  variant: "counter",
  name: "md-pin",
  size: 42,
  color: theme.colors.green,
  counterValue: 0
};

/* Styles */

const iconButtonStyles = StyleSheet.create({
  touchableOpacity: {
    alignItems: "center"
  },
  view: {
    flex: 0,
    overflow: "hidden"
  },
  counterView: {
    alignSelf: "stretch"
  }
});

export default IconButton;