import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet } from "react-native";
import { Item, Input as NBInput, Label } from "native-base";

const Input = React.forwardRef((props, ref) => {
  const combinedProps = {
    ...inputProps[props.variant],
    returnKeyType: props.hasNext? "next" : "done",
    blurOnSubmit: props.hasNext? false : true,
    ...props,
  };

  return (
    <Item floatingLabel last={props.last} style={inputStyles.item}>
      <Label style={inputStyles.label}>{props.label}</Label>
      <NBInput {...combinedProps} style={[inputStyles.input, props.style]} getRef={ref}/>
    </Item>
  );
});

/* Prop Types */

Input.propTypes = {
  variant: PropTypes.oneOf([ "text", "number"]),
  label: PropTypes.string.isRequired,
  hasNext: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired
};

Input.defaultProps = {
  variant: "text",
  hasNext: false,
};

/* Props */

const baseProps = {
};

const inputProps = {
  text: {
    ...baseProps,
    autoCapitalize: "none",
    autoCorrect: false,
  },
  number: {
    ...baseProps,
    keyboardType: "phone-pad",
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
  },
  label: {
    ...baseStyles,
    fontSize: theme.fontSizes.small,
  },
  input: {
    ...baseStyles,
  },
});

export default Input;