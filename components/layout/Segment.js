import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Segment as NBSegment, Button as NBButton } from "native-base";
import { Text } from "../typography";
import View from "./View";

const Segment = (props) => {
  const leftButtonCombinedProps = {
    side: "left",
    text: props.leftText,
    status: (props.active == "left")? "active" : "inactive",
    onPress: props.onLeftButtonPress
  };

  const rightButtonCombinedProps = {
    side: "right",
    text: props.rightText,
    status: (props.active == "right")? "active" : "inactive",
    onPress: props.onRightButtonPress
  }

  return (
    <View style={segmentStyles.view}>
      <SegmentButton {...leftButtonCombinedProps} />
      <SegmentButton {...rightButtonCombinedProps} />
    </View>
  );
}

/* Prop Types */

Segment.propTypes = {
  active: PropTypes.oneOf(["left", "right"]),
  leftText: PropTypes.string.isRequired,
  rightText: PropTypes.string.isRequired,
  onLeftButtonPress: PropTypes.func,
  onRightButtonPress: PropTypes.func
};

Segment.defaultProps = {
  active: "left"
};

/* Styles */

const segmentStyles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
  }
});

///////////////////////////////////////////

const SegmentButton = (props) => {
  const combinedProps = {
    ...segmentButtonProps,
    ...props
  }

  const combinedStyles = {
    ...segmentButtonStyles[props.side],
    ...segmentButtonStyles[props.status]
  }

  const combinedTextStyles = {
    ...textStyles,
    ...segmentButtonTextStyles[props.status]
  }

  return (
    <TouchableOpacity {...combinedProps} style={combinedStyles}>
        <Text style={combinedTextStyles}>{props.text}</Text>
    </TouchableOpacity>
  );
}

/* Prop Types */

SegmentButton.propTypes = {
  side: PropTypes.oneOf(["left", "right"]),
  text: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["active", "inactive"])
};

SegmentButton.defaultProps = {
  side: "left",
  active: false
};

/* Props */

const segmentButtonProps = {
  activeOpacity: theme.buttons.buttonPressOpacity
}

/* Styles */

const buttonStyles = {
  flex: 1,
  justifyContent: "center",
  height: theme.layout.segmentHeight,
  padding: theme.layout.padding,
  borderWidth: 1
}

const segmentButtonStyles = StyleSheet.create({
  left: {
    ...buttonStyles,
    borderTopLeftRadius: theme.layout.segmentHeight,
    borderBottomLeftRadius: theme.layout.segmentHeight
  },
  right: {
    ...buttonStyles,
    borderTopRightRadius: theme.layout.segmentHeight,
    borderBottomRightRadius: theme.layout.segmentHeight
  },
  active: {
    backgroundColor: theme.colors.darkGrey,
    borderColor: theme.colors.darkGrey
  },
  inactive: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.lightGrey
  }
});

const textStyles = {
  textAlign: "center"
}

const segmentButtonTextStyles = StyleSheet.create({
  active: {
    color: theme.colors.white
  },
  inactive: {
    color: theme.colors.darkGrey
  }
});

///////////////////////////////////////////

export default Segment;