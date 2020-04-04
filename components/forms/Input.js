import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Animated, StyleSheet, Platform } from "react-native";
import { Item, Input as NBInput, Label, Icon } from "native-base";
import { Text } from "../typography";

const AnimatedView = (props) => {
  const [animatedHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    if (props.viewIsShowing) {
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
  }, [props.viewIsShowing]);

  return (
    <Animated.View
      style={{...props.style, zIndex: -1, transform: [{
        translateY: animatedHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [-(theme.layout.errorTextHeight), 0]
        })
      }]}}
    >
      {props.children}
    </Animated.View>
  );
}


///////////////////////////////////////////


const Input = React.forwardRef((props, ref) => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const combinedProps = {
    ...inputProps[props.variant],
    returnKeyType: props.hasNext? "next" : "done",
    blurOnSubmit: props.hasNext? false : true,
    secureTextEntry: (props.variant == "password" && passwordHidden),
    ...props,
  };
  const combinedStyles = (props.hasError)? errorInputStyles : inputStyles;

  return (
    <Fragment>
    <Item floatingLabel {...combinedProps.item} last={props.last} style={[combinedStyles.item, props.itemStyle]}>
      <Label style={combinedStyles.label}>{props.label}</Label>
      <NBInput {...combinedProps} style={[combinedStyles.input, props.style]} getRef={ref}/>
        {(props.variant == "password") && ((passwordHidden)? 
        <Icon active style={combinedStyles.icon} name="md-eye" onPress={() => setPasswordHidden(false)} /> 
        : 
        <Icon active style={combinedStyles.icon} name="md-eye-off" onPress={() => setPasswordHidden(true)} />)}
    </Item>
      <AnimatedView style={combinedStyles.view} viewIsShowing={props.hasError}>
        {props.errorText && <Text style={combinedStyles.text}>{props.errorText}</Text>}
      </AnimatedView>
    </Fragment>
  );
});

/* Prop Types */

Input.propTypes = {
  variant: PropTypes.oneOf([ "text", "password", "number"]),
  label: PropTypes.string.isRequired,
  hasNext: PropTypes.bool,
  hasError: PropTypes.bool,
  errorText: PropTypes.string
};

Input.defaultProps = {
  variant: "text",
  hasNext: false,
  hasError: false
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
    height: theme.layout.errorTextHeight,
    alignSelf: "stretch",
    marginLeft: 2,                          // To align with NativeBase Input
  },
  text: {
    ...baseStyles,
    fontSize: theme.fontSizes.xsmall,
    flex: 0,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    padding: theme.layout.padding,
    backgroundColor: theme.colors.lightRed,
  },
  icon: {
    color: theme.colors.darkGrey
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