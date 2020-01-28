import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, List, ListItem } from "../components/layout";
import { Checkbox } from "../components/forms";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import { Modal } from "../components/popups";
import theme from "../styles/base";
import { connect } from 'react-redux';

class RemoveRespondersScreen extends Component {
  constructor(props) {
    super(props);
    const myResponders = this.props.responders.myResponders; 

    let responderSelectionMap = new Map();
    for (responder of myResponders) {
      responderSelectionMap.set(responder.username, false);
    }
    
    this.state = {
      responderSelectionMap: responderSelectionMap,
      selectedResponders: [],
      modalVisible: false
    };
  }

  onCheckboxPress = (username) => {
    let responderSelectionMap = this.state.responderSelectionMap;
    let oldValue = responderSelectionMap.get(username);
    responderSelectionMap.set(username, !oldValue);
    this.setState({responderSelectionMap});
  }

  removeSelectedResponders = () => {
    // TODO: ping backend to remove the usernames in this.state.selectedResponders from this user's profile
    console.log(this.state.selectedResponders)
    Actions.pop();
  }

  modalHeader = "Removing responders";
  modalFooterLeft = (<Button variant="secondary" onPress={() => this.setState({modalVisible: false})}>Cancel</Button>);
  modalFooterRight = (<Button variant="primary" style={{backgroundColor: theme.colors.red}} onPress={() => this.removeSelectedResponders()}>Remove</Button>);

  gatherSelectedResponders = () => {
    let selectedResponders = [];
    for (let [username, isSelected] of this.state.responderSelectionMap) {
      if (isSelected) {
        selectedResponders.push(username);
      }
    }
    return selectedResponders;
  }

  renderModalBody = () => {
    let modalBody = [];
    for (username of this.state.selectedResponders) {
      modalBody.push(<ListItem key={username} leftText={username} />);
    }
    return (<List style={styles.list}>
            {modalBody}
            </List>);
  }

  renderRespondersList = () => {
    let respondersList = []
    for (let [username, isSelected] of this.state.responderSelectionMap) {
      respondersList.push(
        <View style={styles.row} key={username}>
          <Checkbox checked={isSelected}
            onPress={() => this.onCheckboxPress(username)} />
          <ListItem
            leftText={username}
          />
        </View>
      );
    }
    return respondersList;
  }

  render() {
    return (
      <Container>
        <Modal
          modalVisible={this.state.modalVisible}
          modalHeader={this.modalHeader}
          modalBody={this.renderModalBody()}
          modalFooterLeft={this.modalFooterLeft}
          modalFooterRight={this.modalFooterRight}
          onBackdropPress={() => this.setState({modalVisible: false})}
          onBackButtonPress={() => this.setState({modalVisible: false})}
        /> 

        <Header leftButton="arrow" 
        onLeftButtonPress={() => Actions.pop()}
        >
          Remove Responders
        </Header>

        <Content>
          <List style={styles.list}>
            {this.renderRespondersList()}
          </List>

          <View style={styles.removeButton}>
            <Button variant="primary" style={{backgroundColor: theme.colors.red}}
              onPress={() => {
                this.setState({modalVisible: true, selectedResponders: this.gatherSelectedResponders()});
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
  list: {
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  removeButton: {
    flex: 0,
    marginTop: theme.layout.margin
  }
});

const mapStateToProps = (state) => {
  return {
    responders: state.responders
  }
}

export default connect(mapStateToProps)(RemoveRespondersScreen);