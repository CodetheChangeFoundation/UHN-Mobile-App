import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Animated, StyleSheet, Platform } from "react-native";
import { Item, Input as NBInput, Label, Icon } from "native-base";
import { Text } from "../typography";
import validate from "validate.js";

const Input = React.forwardRef((props, ref) => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [error, setError] = useState(null);

  const inputStyles = (!!error)? errorInputStyles : noErrorInputStyles;

  // Wrapper for onChangeText
  const onChangeText = ((newValue) => {
    // Validate input and signal parent whether it's valid or not
    if (!!props.constraints) {
      const result = validate.single(newValue, props.constraints, {fullMessages: false});
      setError(result);
      props.onChangeText(newValue, !result);
    } else {
      // No validation needed
      props.onChangeText(newValue);
    }
  });

  return (
    <Fragment>

      <Item floatingLabel {...itemProps} style={inputStyles.item}>

        <Label style={inputStyles.label}>{props.label}</Label>

        <NBInput
          {...{...inputProps[props.variant], ...props}} 
          returnKeyType={props.hasNext? "next" : "done"}
          blurOnSubmit={props.hasNext? false : true}
          secureTextEntry={(props.variant == "password" && passwordHidden)}
          style={{...inputStyles.input, ...props.style}}
          getRef={ref}
          onChangeText={onChangeText}
        />

        {/* For password inputs, add an icon to show/hide password */}
        {(props.variant == "password") && (
          (passwordHidden)? 
          <Icon active style={inputStyles.icon} name="md-eye" onPress={() => setPasswordHidden(false)} /> 
          : 
          <Icon active style={inputStyles.icon} name="md-eye-off" onPress={() => setPasswordHidden(true)} />
        )}

      </Item>

      <AnimatedView style={inputStyles.view} viewIsShowing={!!error}>
        {<Text style={inputStyles.text}>{error?.[0]}</Text>}
      </AnimatedView>

    </Fragment>
  );
});

/* Prop Types */

Input.propTypes = {
  variant: PropTypes.oneOf([ "text", "email", "password", "number"]),
  label: PropTypes.string.isRequired,
  hasNext: PropTypes.bool,
  constraints: PropTypes.object
};

Input.defaultProps = {
  variant: "text",
  hasNext: false
};

/* Props */

const itemProps = {
  placeholderTextColor: theme.colors.darkGrey
};

const inputProps = {
  text: {
    autoCapitalize: "none",
    autoCorrect: false
  },
  email: {
    keyboardType: "email-address"
  },
  number: {
    keyboardType: (Platform.OS == "ios")? "numbers-and-punctuation" : "phone-pad"
  }
};

/* Styles */

const baseStyles = {
  fontFamily: theme.fonts.body,
  fontSize: theme.fontSizes.medium,
  color: theme.colors.darkGrey
}

const noErrorInputStyles = StyleSheet.create({
  item: {
    ...baseStyles,
    marginTop: theme.layout.margin,
    backgroundColor: theme.colors.white    // Match the background color
  },
  label: {
    ...baseStyles,
    fontSize: theme.fontSizes.small
  },
  input: {
    ...baseStyles
  },
  view: {
    height: theme.layout.errorTextHeight,
    alignSelf: "stretch",
    marginLeft: 2                          // To align with NativeBase Input
  },
  text: {
    ...baseStyles,
    fontSize: theme.fontSizes.xsmall,
    flex: 0,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    padding: theme.layout.padding,
    backgroundColor: theme.colors.lightRed
  },
  icon: {
    color: theme.colors.darkGrey
  }
});

const errorInputStyles = StyleSheet.create({
  ...noErrorInputStyles,
  item: {
    ...noErrorInputStyles.item,
    borderBottomColor: theme.colors.red
  }
});

///////////////////////////////////////////
/* AnimatedView component used in Input */

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

export default Input;