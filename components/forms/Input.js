import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Animated, StyleSheet, Platform } from "react-native";
import { Item, Input as NBInput, Label, Icon } from "native-base";
import { Text } from "../typography";
import validate from "validate.js";

const Input = React.forwardRef((props, ref) => {
  const [refresh, setRefresh] = useState(props.refresh);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const inputStyles = (!!error)? errorInputStyles : noErrorInputStyles;

  useEffect(() => {
    // Force a validation
    if (props.refresh !== refresh) {
      setRefresh(props.refresh);
      validateInput(value);
    }
  });

  // Wrapper for onChangeText
  const onChangeText = ((newValue) => {
    setValue(newValue);
    // Validate input and signal parent whether it's valid or not
    if (!!props.constraints) {
      validateInput(newValue);
    } else {
      // No validation needed
      props.onChangeText(newValue);
    }
  });

  const validateInput = ((value) => {
    const result = validate.single(value, props.constraints, {fullMessages: false});
    setError(result);
    props.onChangeText(value, !result);
  });

  const passwordIcon = passwordHidden? "md-eye" : "md-eye-off";
  return (
    <Fragment>

      <Item floatingLabel={!!props.label} {...itemProps} style={inputStyles.item}>

        {
          props.label &&
          <Label style={inputStyles.label}>{props.label}</Label>
        }

        <NBInput
          {...{...inputProps[props.variant], ...props}}
          returnKeyType={props.hasNext? "next" : "done"}
          blurOnSubmit={props.multiline? true : props.hasNext? false : true}
          secureTextEntry={(props.variant == "password" && passwordHidden)}
          style={{...inputStyles.input, ...props.style}}
          textAlignVertical={props.multiline? "top" : "auto"}
          getRef={ref}
          onChangeText={onChangeText}
        />

        {/* For password inputs, add an icon to show/hide password */}
        {
          (props.variant == "password") &&
          <Icon active style={inputStyles.icon} name={passwordIcon} onPress={() => setPasswordHidden(false)} />
        }

      </Item>

      <AnimatedView style={inputStyles.view} viewIsShowing={!!error}>
        {(!!props.constraints) && <Text style={inputStyles.text}>{error?.[0]}</Text>}
      </AnimatedView>

    </Fragment>
  );
});

/* Prop Types */

Input.propTypes = {
  variant: PropTypes.oneOf([ "text", "password", "number"]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  hasNext: PropTypes.bool,
  refresh: PropTypes.bool,
  constraints: PropTypes.object,
  onChangeText: PropTypes.func
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
};

const noErrorInputStyles = StyleSheet.create({
  item: {
    ...baseStyles,
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
          outputRange: [-(theme.layout.errorTextHeight + theme.layout.padding), 0]
        })
      }]}}
    >
      {props.children}
    </Animated.View>
  );
};

///////////////////////////////////////////

export default Input;