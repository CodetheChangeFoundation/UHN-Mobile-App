import React, { useState } from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Item, Input, Label, Icon } from "native-base";

const SearchBar = (props) => {
  const [showClearButton, setShowClearButton] = useState(false);
  let textInput = React.createRef();

  const onFocus = () => { setShowClearButton(true); }
  const onBlur = () => { setShowClearButton(false); }

  const onClearButtonPress = () => {
    textInput._root.clear();
    props.onClearButtonPress();
  }

  return (
    <Item style={searchBarStyles.item}>
      <Icon name="md-search" style={searchBarStyles.icon} />
      <Input
        {...{
          ...searchBarProps,
          ...props
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{...searchBarStyles.input, ...props.style}}
        ref={(input) => {textInput = input}} 
      />
        {props.enableClearButton && showClearButton && 
          <TouchableOpacity onPress={() => onClearButtonPress()}>
            <Icon name="md-close-circle" style={searchBarStyles.icon} />
          </TouchableOpacity>
        }
    </Item>
  );
}

/* Prop Types */

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  enableClearButton: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  onClearButtonPress: PropTypes.func,
  onSubmitEditing: PropTypes.func.isRequired
}

SearchBar.defaultProps = {
  enableClearButton: false,
  onClearButtonPress: null
}

/* Props */

const searchBarProps = {
  placeholderTextColor: theme.colors.darkGrey,
}

/* Styles */

const baseStyles = {
  fontFamily: theme.fonts.body,
  fontSize: theme.fontSizes.medium,
  color: theme.colors.darkGrey,
}

const searchBarStyles = StyleSheet.create({
  icon: {
    color: theme.colors.lightGrey,
    fontSize: theme.iconSizes.body
  },
  item: {
    ...baseStyles,
    marginBottom: theme.layout.margin
  },
  input: {
    ...baseStyles
  }
});

export default SearchBar;