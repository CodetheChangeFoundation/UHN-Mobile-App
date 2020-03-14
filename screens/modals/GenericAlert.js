import React from "react";
import { Alert, Platform } from "react-native";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Actions } from "react-native-router-flux";

const GenericAlert = (props) => {
  const { 
    alertTitle, alertBody,
    cancelable, onDismiss 
  } = props;
  
  console.log("alert opened in", Actions.currentScene)

  const runFunc = (func) => {
    console.log("leaving", Actions.currentScene)
    Actions.pop();
    if (func) {
      func();
    }
  }

  const renderButtons = (props) => {
    const {
      positiveButtonText, positiveButtonStyle, onPositiveButtonPress,
      negativeButtonText, negativeButtonStyle, onNegativeButtonPress,
      neutralButtonText, neutralButtonStyle, onNeutralButtonPress
    } = props;
    let buttons = [];

    if (Platform.OS == "android") {
      buttons.push({ text: neutralButtonText, style: neutralButtonStyle, onPress: () => runFunc(onNeutralButtonPress) });
    }
    buttons.push({ text: negativeButtonText, style: negativeButtonStyle, onPress: () => runFunc(onNegativeButtonPress) });
    buttons.push({ text: positiveButtonText, style: positiveButtonStyle, onPress: () => runFunc(onPositiveButtonPress) });

    return buttons;
  }
  
  Alert.alert(
    alertTitle,
    alertBody,
    // [
      // { text: positiveButtonText, style: positiveButtonStyle, onPress: () => { Actions.pop(); onPositiveButtonPress() } },
      // { text: negativeButtonText, style: negativeButtonStyle, onPress: () => { Actions.pop(); onNegativeButtonPress() } },
      // { text: neutralButtonText, style: neutralButtonStyle, onPress: () => { Actions.pop(); onNeutralButtonPress() } }
      // { text: neutralButtonText, style: neutralButtonStyle, onPress: () => runFunc(onNeutralButtonPress) },
      // { text: negativeButtonText, style: negativeButtonStyle, onPress: () => runFunc(onNegativeButtonPress) },
      // { text: positiveButtonText, style: positiveButtonStyle, onPress: () => runFunc(onPositiveButtonPress) }
    // ],
    renderButtons(props),
    // { cancelable }
    // { onDismiss: runFunc(onDismiss) }
    { cancelable, onDismiss: runFunc(onDismiss) }
  );
  
  return null;
};

GenericAlert.propTypes = {
  alertTitle: PropTypes.string.isRequired,
  alertBody: PropTypes.string.isRequired,
  positiveButtonText: PropTypes.string,
  positiveButtonStyle: PropTypes.oneOf(["default", "cancel", "destructive"]),
  onPositiveButtonPress: PropTypes.func,
  negativeButtonText: PropTypes.string,
  negativeButtonStyle: PropTypes.oneOf(["default", "cancel", "destructive"]),
  onNegativeButtonPress: PropTypes.func,
  neutralButtonText: PropTypes.string,
  neutralButtonStyle: PropTypes.oneOf(["default", "cancel", "destructive"]),
  onNeutralButtonPress: PropTypes.func,
  cancelable: PropTypes.bool,
  onDismiss: PropTypes.func
}

GenericAlert.defaultProps = {
  positiveButtonText: "",
  positiveButtonStyle: "default",
  onPositiveButtonPress: null,
  negativeButtonText: "",
  negativeButtonStyle: "cancel",
  onNegativeButtonPress: null,
  neutralButtonText: "",
  neutralButtonStyle: "default",
  onNeutralButtonPress: null,
  cancelable: true,
  onDismiss: null
}

export default GenericAlert;
