import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Animated, StyleSheet, Platform } from "react-native";
import { Item, Input as NBInput, Label } from "native-base";
import { Text } from "../typography";

const AnimatedView = (props) => {
  const [animatedHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    if (props.isVisible) {
      Animated.timing(
        animatedHeight,
        {
          toValue: 1,
          duration: theme.animation.fast,
          useNativeDriver: true,
        }
      ).start();
    } else {
      Animated.timing(
        animatedHeight,
        {
          toValue: 0,
          duration: theme.animation.fast,
          useNativeDriver: true,
        }
      ).start();
    }
  }, [props.isVisible]);

  return (
    <Animated.View
      style={{...props.style, zIndex: -1, transform: [{
        translateY: animatedHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [-27, 0]     // May need to change if error message fontSize is changed
        })
      }]}}
    >
      {props.children}
    </Animated.View>
  );
}


///////////////////////////////////////////


const Input = React.forwardRef((props, ref) => {
  const combinedProps = {
    ...inputProps[props.variant],
    returnKeyType: props.hasNext? "next" : "done",
    blurOnSubmit: props.hasNext? false : true,
    ...props,
  };
  const combinedStyles = (props.hasError)? errorInputStyles : inputStyles;

  return (
    <Fragment>
    <Item floatingLabel {...combinedProps.item} last={props.last} style={combinedStyles.item}>
      <Label style={combinedStyles.label}>{props.label}</Label>
      <NBInput {...combinedProps} style={[combinedStyles.input, props.style]} getRef={ref}/>
    </Item>
    <AnimatedView style={combinedStyles.view} isVisible={props.hasError}>
      <Text style={combinedStyles.text}>{props.errorText}</Text>
    </AnimatedView>
    </Fragment>
  );
});

/* Prop Types */

Input.propTypes = {
  variant: PropTypes.oneOf([ "text", "email", "number"]),
  label: PropTypes.string.isRequired,
  hasNext: PropTypes.bool,
  hasError: PropTypes.bool,
  errorText: PropTypes.string
};

Input.defaultProps = {
  variant: "text",
  hasNext: false,
  hasError: false,
  errorText: "Error detected.",
};

/* Props */

const baseProps = {
  item: {
    placeholderTextColor: theme.colors.darkGrey,
  }
};

const inputProps = {
  text: {
    ...baseProps,
    autoCapitalize: "none",
    autoCorrect: false,
  },
  email: {
    ...baseProps,
    keyboardType: "email-address",
  },
  number: {
    ...baseProps,
    keyboardType: (Platform.OS == "ios")? "numbers-and-punctuation" : "phone-pad",
  },
};

/* Styles */

const baseStyles = {
  fontFamily: theme.fonts.body,
  fontSize: theme.fontSizes.medium,
  color: theme.colors.darkGrey,
}

const inputStyles = StyleSheet.create({
  item: {
    ...baseStyles,
    marginTop: theme.layout.margin,
    backgroundColor: theme.colors.white,    // Match the background color
  },
  label: {
    ...baseStyles,
    fontSize: theme.fontSizes.small,
  },
  input: {
    ...baseStyles,
  },
  view: {
    flex: 0,
    alignSelf: "stretch",
    marginLeft: 2,                          // To align with NativeBase Input
    paddingLeft: 2,
    backgroundColor: theme.colors.lightRed,
  },
  text: {
    ...baseStyles,
    fontSize: theme.fontSizes.xsmall,
    flex: 0,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    padding: theme.layout.padding,
  }
});

const errorInputStyles = StyleSheet.create({
  ...inputStyles,
  item: {
    ...inputStyles.item,
    borderBottomColor: theme.colors.red,
  },
});

export default Input;