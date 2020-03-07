import React from "react";
import { Modal } from "../../components/popups";

const GenericModal = (props) => {
  return (
    <Modal
      modalVisible={props.modalVisible}
      modalHeader={props.modalHeader}
      modalBody={props.modalBody}
      modalFooterLeft={props.modalFooterLeft}
      modalFooterRight={props.modalFooterRight}
      onBackdropPress={props.onBackdropPress}
      onBackButtonPress={props.onBackButtonPress}
    /> 
  );
};

export default GenericModal;
