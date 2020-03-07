import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../typography";

const Button = (props) => {
  const combinedProps = {
    ...buttonProps,
    ...props,
  };

  return (
    <TouchableOpacity {...combinedProps} 
      style={[baseButtonStyles, variantButtonStyles[props.variant], sizeButtonStyles[props.size], props.style]}
    >
      <Text variant="body" 
        style={[baseTextStyles, variantTextStyles[props.variant], sizeTextStyles[props.size], props.textStyles]}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

/* Prop Types */

Button.propTypes = {
  variant: PropTypes.oneOf([ "dark", "light", "affirmation", "warning" ]),
  size: PropTypes.oneOf([ "medium", "large" ]),
  textStyles: PropTypes.object
};

Button.defaultProps = {
  variant: "dark",
  size: "medium"
};

/* Props */

const buttonProps = {
  activeOpacity: theme.buttons.buttonPressOpacity,
}

/* Styles */

const baseButtonStyles = {
  margin: theme.layout.margin,
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 1,
};

const variantButtonStyles = StyleSheet.create({
  dark: {
    backgroundColor: theme.colors.darkGrey,
  },
  light: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.darkGrey,
  },
  affirmation: {
    backgroundColor: theme.colors.green,
  },
  warning: {
    backgroundColor: theme.colors.red,
  }
});

const variantTextStyles = StyleSheet.create({
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

const baseTextStyles = {
  textAlign: "center",
}

const sizeButtonStyles = StyleSheet.create({
  medium: {
    height: 54,
    width: 180,
    borderRadius: 54,
    paddingHorizontal: 18,
  },
  large: {
    height: 72,
    width: 240,
    borderRadius: 72,
    paddingHorizontal: 24,
  }
});

const sizeTextStyles = StyleSheet.create({
  medium: {
    fontSize: theme.fontSizes.medium,
  },
  large: {
    fontSize: theme.fontSizes.large,
  }
});

export default Button;