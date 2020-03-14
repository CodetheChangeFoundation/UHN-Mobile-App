import React from "react";
import { Alert as RNAlert } from "react-native";
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { Actions } from "react-native-router-flux";

const Alert = (props) => {
  const { 
    alertTitle, alertBody, 
    positiveButton, negativeButton, neutralButton,
    cancelable
  } = props;
  
  console.log("alert opened in", Actions.currentScene)

  const runFunc = (func) => {
    console.log("leaving", Actions.currentScene)
    Actions.pop();
    if (func) {
      func();
    }
  }

  const renderButtons = (positiveButton, negativeButton, neutralButton) => {
    let buttons = [];

    // Neutral
    if (!!neutralButton) {
      if (!!negativeButton) {
        buttons.push({ text: neutralButton.text, style: neutralButton.style, onPress: () => runFunc(neutralButton.onPress) });
      } else {
        console.warn("Alert PropTypes: neutralButton requires negativeButton to be defined");
      }
    }
    // Negative
    if (!!negativeButton) {
      buttons.push({ text: negativeButton.text, style: negativeButton.style, onPress: () => runFunc(negativeButton.onPress) });
    }
    // Positive
    buttons.push({ text: positiveButton.text, style: positiveButton.style, onPress: () => runFunc(positiveButton.onPress) });

    return buttons;
  }
  
  RNAlert.alert(
    alertTitle,
    alertBody,
    renderButtons(positiveButton, negativeButton, neutralButton),
    {
      cancelable, 
      onDismiss: () => runFunc(null)  // To pop this Scene when cancelable == true and the modal is dismissed
    }
  );
  
  return null;
};

/* Props */

Alert.propTypes = {
  alertTitle: PropTypes.string.isRequired,
  alertBody: PropTypes.string,
  positiveButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    style: PropTypes.oneOf(["default", "cancel", "destructive"]),
    onPress: PropTypes.func
  }).isRequired,
  negativeButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    style: PropTypes.oneOf(["default", "cancel", "destructive"]),
    onPress: PropTypes.func
  }),
  neutralButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    style: PropTypes.oneOf(["default", "cancel", "destructive"]),
    onPress: PropTypes.func
  }),
  cancelable: PropTypes.bool
}

Alert.defaultProps = {
  positiveButton: {
    text: "OK"
  },
  cancelable: true
}

export default Alert;
