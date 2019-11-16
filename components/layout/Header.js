import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Platform, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Header as NBHeader, Left, Body, Right } from "native-base";
import { Text } from "../typography";

const Header = (props) => {
  const leftButtonCombinedProps = {
    ...headerProps.leftButton,
    name: iconName[props.leftButton],
    onPress: props.onLeftButtonPress
  }

  const bodyCombinedStyles = {
    ...headerStyles.body,
    marginLeft: (props.leftButton)? 16 : 0
  }

  return (
    <NBHeader {...props} style={[headerStyles.header, props.style]}>
      <Left style={headerStyles.left}>
        {(props.leftButton) && <Ionicons {...leftButtonCombinedProps}/>}
      </Left>
      <Body style={bodyCombinedStyles}>
        <Text variant="header">{props.children}</Text>
      </Body>
      <Right style={headerStyles.right} />
    </NBHeader>
  );
}

/* Prop Types */

Header.propTypes = {
  leftButton: PropTypes.oneOf(["arrow", "menu"]),
  onLeftButtonPress: PropTypes.func
};

/* Props */

const iconName = {
  arrow: "md-arrow-back",
  menu: "md-menu"
}

const headerProps = {
  leftButton: {
    size: 28,
    color: theme.colors.white,
  }
}

/* Styles */

const segment = {
  flex: 0,
  alignSelf: "flex-end",
}

const headerStyles = StyleSheet.create({
  header: {
    height: 90,
    alignItems: "flex-end",
    paddingVertical: 16,
    backgroundColor: theme.colors.darkGrey,
  },
  left: {
    ...segment,
    marginLeft: 16
  },
  body: {
    ...segment,
    flex: 1,
    alignItems: "flex-start",
  },
  right: {
    ...segment,
    marginRight: 16,
  }
});

export default Header;