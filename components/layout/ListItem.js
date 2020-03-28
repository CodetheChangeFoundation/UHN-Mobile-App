import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base"
import { StyleSheet } from "react-native";
import View from "./View";
import { Text } from "../typography";

const ListItem = (props) => {
  return (
      <View {...props} style={{...listItemStyles.listItem, ...props.style}}>
        {!!props.leftText && <View style={listItemStyles.leftView}>
          <Text style={{...listItemStyles.leftText, ...props.leftTextStyle}}>{props.leftText}</Text>
        </View>}
        {!!props.rightText && <View style={listItemStyles.rightView}>
          <Text style={{...listItemStyles.rightText, ...props.rightTextStyle}}>{props.rightText}</Text>
        </View>}
      </View>
  );
}

/* Prop Types */

ListItem.propTypes = {
  leftText: PropTypes.string,
  leftTextStyle: PropTypes.object,
  rightText: PropTypes.string,
  rightTextStyle: PropTypes.object
};

/* Styles */

const listItemStyles = StyleSheet.create({
  listItem: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
    margin: 0,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.layout.margin
  },
  leftView: {
    flex: 1,
    alignItems: "flex-start"
  },
  rightView: {
    flex: 1,
    alignItems: "flex-end"
  },
  leftText: {
    fontFamily: theme.fonts.header,
    color: theme.colors.lightGrey
  },
  rightText: {
    fontSize: theme.fontSizes.xsmall
  }
});

export default ListItem;