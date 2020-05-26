import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../typography";

const Button = (props) => {
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
  
  const disabled = props.disabled || throttle;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={theme.buttons.buttonPressOpacity}
      onPress={onPress}
      disabled={disabled}
      style={{
        ...baseButtonStyles,
        ...buttonStylesByVariant[props.variant],
        ...buttonStylesBySize[props.size],
        ...props.style,
        opacity: disabled? theme.buttons.buttonPressOpacity : 1
      }}
    >
      <Text variant="body" 
        style={{
          ...baseTextStyles,
          ...textStylesByVariant[props.variant],
          ...textStylesBySize[props.size],
          ...props.textStyles
        }}
      >
        {props.disabled? props.loadingText : props.children}
      </Text>
    </TouchableOpacity>
  );
};

/* Prop Types */

Button.propTypes = {
  variant: PropTypes.oneOf([ "dark", "light", "affirmation", "warning" ]),
  size: PropTypes.oneOf([ "medium", "large" ]),
  textStyles: PropTypes.object,
  loadingText: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  variant: "dark",
  size: "medium"
};

/* Styles */

const baseButtonStyles = {
  margin: theme.layout.margin,
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 1
};

const buttonStylesByVariant = StyleSheet.create({
  dark: {
    backgroundColor: theme.colors.darkGrey
  },
  light: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.darkGrey
  },
  affirmation: {
    backgroundColor: theme.colors.green
  },
  warning: {
    backgroundColor: theme.colors.red
  }
});

const buttonStylesBySize = StyleSheet.create({
  medium: {
    height: 54,
    width: 180,
    borderRadius: 54,
    paddingHorizontal: 18
  },
  large: {
    height: 72,
    width: 240,
    borderRadius: 72,
    paddingHorizontal: 24
  }
});

const baseTextStyles = {
  textAlign: "center"
}

const textStylesByVariant = StyleSheet.create({
  dark: {
    color: theme.colors.white
  },
  light: {
    color: theme.colors.darkGrey
  },
  affirmation: {
    color: theme.colors.white
  },
  warning: {
    color: theme.colors.white
  }
});

const textStylesBySize = StyleSheet.create({
  medium: {
    fontSize: theme.fontSizes.medium
  },
  large: {
    fontSize: theme.fontSizes.large
  }
});

export default Button;