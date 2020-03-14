import React from "react";
import { Alert } from "../../components/popups";

const GenericAlert = (props) => {
  return (
    <Alert
      alertTitle={props.alertTitle}
      alertBody={props.alertBody}
      positiveButton={props.positiveButton}
      negativeButton={props.negativeButton}
      neutralButton={props.neutralButton}
      cancelable={props.cancelable}
    /> 
  );
};

export default GenericAlert;
