import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Platform, StyleSheet } from "react-native";
import { Header as NBHeader, Left, Body, Right, Icon } from "native-base";
import { Text } from "../typography";

const Header = (props) => {
  return (
    <NBHeader {...props} style={{...headerStyles.header, ...props.style}}>

      <Left style={headerStyles.left}>
        {(props.leftButton) && 
          <Icon name={iconName[props.leftButton]} onPress={props.onLeftButtonPress} style={headerStyles.leftButton}/>
        }
      </Left>

      <Body style={{
        ...headerStyles.body,
        marginLeft: (props.leftButton)? theme.layout.margin : 0
      }}>
        <Text variant="header">{props.children}</Text>
      </Body>

      <Right style={headerStyles.right} />

    </NBHeader>
  );
};

/* Prop Types */

Header.propTypes = {
  leftButton: PropTypes.oneOf(["arrow", "menu"]),
  onLeftButtonPress: PropTypes.func
};

/* Props */

const iconName = {
  arrow: "md-arrow-back",
  menu: "md-menu"
};

/* Styles */

const segment = {
  flex: 0,
  alignSelf: "flex-end"
};

const headerStyles = StyleSheet.create({
  header: {
    height: theme.layout.headerHeight,
    alignItems: "flex-end",
    paddingVertical: theme.layout.margin,
    backgroundColor: theme.colors.darkGrey
  },
  leftButton: {
    fontSize: theme.iconSizes.header,
    color: theme.colors.white
  },
  left: {
    ...segment,
    marginLeft: theme.layout.margin
  },
  body: {
    ...segment,
    flex: 1,
    alignItems: "flex-start"
  },
  right: {
    ...segment,
    marginRight: theme.layout.margin
  }
});

export default Header;