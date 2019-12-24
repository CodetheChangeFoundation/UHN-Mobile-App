import React, { Fragment } from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Modal as RNModal } from 'react-native';
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { View } from "../layout";
import { Button } from "../buttons";
import { Text } from "../typography";

const Modal = (props) => {
  const deviceHeight = Math.round(Dimensions.get('window').height * 0.5);

  return (
    <RNModal animationType="fade" 
      transparent={true} 
      visible={props.modalVisible} 
      onRequestClose={props.onBackButtonPress} 
      style={styles.modal}
    >
      <TouchableWithoutFeedback onPress={props.onBackdropPress}>
        <View style={styles.backdrop}>
          <View style={[styles.container, { height: deviceHeight }]} onStartShouldSetResponder={() => true}>
            
            <View style={styles.header}>
              <Text variant="title">{props.modalHeader}</Text>
            </View>

            <View style={styles.body}>
              {props.modalBody}
            </View>

            <View style={[styles.footer, { flex: props.modalFooterLeft || props.modalFooterRight? 2 : 0 }]}>
              {props.modalFooterLeft}
              {props.modalFooterRight}
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}

/* Prop Types */

Modal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  modalHeader: PropTypes.string.isRequired,
  modalBody: PropTypes.element.isRequired,
  modalFooterLeft: PropTypes.element,
  modalFooterRight: PropTypes.element,
  onBackdropPress: PropTypes.func,
  onBackButtonPress: PropTypes.func,
};

/* Styles */

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
  },
  container: {
    flex: 0,
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    padding: 20,
    margin: theme.layout.margin,
    alignSelf: "stretch",
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 4,
    padding: theme.layout.padding,
    alignSelf: "stretch",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Modal;
