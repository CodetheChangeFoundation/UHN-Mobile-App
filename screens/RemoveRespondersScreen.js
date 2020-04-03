import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, List, ListItem } from "../components/layout";
import { Checkbox } from "../components/forms";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import { Modal } from "../components/popups";
import theme from "../styles/base";
import { removeResponders } from "../store/actions";
import { connect } from "react-redux";

class RemoveRespondersScreen extends Component {
  constructor(props) {
    super(props);
    const myResponders = this.props.responders.myResponders; 

    let idSelectionMap = new Map();
    let idToUsernameMap = new Map();
    for (responder of myResponders) {
      idSelectionMap.set(responder.id, false);
      idToUsernameMap.set(responder.id, responder.username);
    }

    this.state = {
      idSelectionMap,
      idToUsernameMap,
      selectedUsernames: []
    };
    
  }

  onCheckboxPress = (userId) => {
    let idSelectionMap = this.state.idSelectionMap;
    let oldValue = idSelectionMap.get(userId);
    idSelectionMap.set(userId, !oldValue);
    this.setState({idSelectionMap});
  }

  removeSelectedResponders = () => {
    let selectedResponders = [];
    for (let [userId, isSelected] of this.state.idSelectionMap) {
      if (isSelected) {
        selectedResponders.push({id: userId});
      }
    }
    this.props.removeResponders(this.props.auth.userId, this.props.auth.token, selectedResponders, this.props.responders.myResponders);
  }

  modalHeader = "Removing responders";
  modalFooterLeft = (<Button variant="light" size="medium" onPress={() => Actions.pop()}>cancel</Button>);
  modalFooterRight = (<Button variant="warning" size="medium" onPress={() => this.removeSelectedResponders()}>remove</Button>);
  modalFooterRight = (<Button variant="warning" size="medium" 
                      onPress={() => {
                        Actions.pop(); // Pop from the GenericModal screen
                        this.removeSelectedResponders()} // Pop from this screen
                      }>
                        remove
                      </Button>);

  renderModalBody = (selectedUsernames) => {
    let modalBody = [];
    for (username of selectedUsernames) {
      modalBody.push(<ListItem key={username} leftText={username} />);
    }
    return (<List style={styles.modalList}>
            {modalBody}
            </List>);
  }

  gatherSelectedUsernames = () => {
    let selectedUsernames = [];
    for (let [userId, isSelected] of this.state.idSelectionMap) {
      if (isSelected) {
        selectedUsernames.push(this.state.idToUsernameMap.get(userId));
      }
    }
    return selectedUsernames;
  }

  renderRespondersList = () => {
    let respondersList = []
    for (let [userId, isSelected] of this.state.idSelectionMap) {
      respondersList.push(
        <View style={styles.row} key={userId}>
          <Checkbox checked={isSelected}
            onPress={() => this.onCheckboxPress(userId)} />
          <ListItem
            leftText={this.state.idToUsernameMap.get(userId)}
          />
        </View>
      );
    }
    return respondersList;
  }

  render() {
    return (
      <Container>
        <Header leftButton="arrow" 
        onLeftButtonPress={() => Actions.pop()}
        >
          Remove Responders
        </Header>

        <Content>
          <List>
            {this.renderRespondersList()}
          </List>

          <View style={styles.removeButton}>
            <Button variant="warning" size="medium"
              onPress={() => {
                const selectedUsernames = this.gatherSelectedUsernames();
                this.setState({selectedUsernames});
                modalParams = {
                  modalHeader: this.modalHeader,
                  modalBody: this.renderModalBody(selectedUsernames),
                  modalFooterLeft: this.modalFooterLeft,
                  modalFooterRight: this.modalFooterRight,
                  onBackdropPress: () => Actions.pop(),
                  onBackButtonPress: () => Actions.pop()
                }
                Actions.modal(modalParams);
              }}
            >
              remove selected
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  removeButton: {
    flex: 0,
    marginTop: theme.layout.margin
  },
  modalList: {
    height: Math.round(Dimensions.get("window").height * 0.3)
  }
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    responders: state.responders
  }
}

export default connect(mapStateToProps, { removeResponders })(RemoveRespondersScreen);