import React from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Modal as RNModal } from 'react-native';
import PropTypes from "prop-types";
import theme from "../../styles/base";
import { View } from "../layout";
import { Text } from "../typography";

const Modal = (props) => {

  return (
    <RNModal animationType="fade" 
      transparent={true} 
      visible={props.modalVisible} 
      onRequestClose={props.onBackButtonPress} 
      style={styles.modal}
    >
      <TouchableWithoutFeedback onPress={props.onBackdropPress}>
        <View style={styles.backdrop}>
          <View style={styles.container} onStartShouldSetResponder={() => true}>
            
            <View style={styles.header}>
              <Text variant="title">{props.modalHeader}</Text>
            </View>

            <View style={styles.body}>
              {props.modalBody}
            </View>

            <View style={styles.footer}>
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
  modalVisible: PropTypes.bool,
  modalHeader: PropTypes.string.isRequired,
  modalBody: PropTypes.element.isRequired,
  modalFooterLeft: PropTypes.element,
  modalFooterRight: PropTypes.element,
  onBackdropPress: PropTypes.func,
  onBackButtonPress: PropTypes.func
};

Modal.defaultProps = {
  modalVisible: true
}

/* Styles */

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
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
    justifyContent: "space-between"
  },
  header: {
    flex: 0,
    alignSelf: "stretch",
    marginBottom: theme.layout.margin
  },
  body: {
    flex: 0,
    padding: theme.layout.padding,
    alignSelf: "stretch"
  },
  footer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default Modal;
