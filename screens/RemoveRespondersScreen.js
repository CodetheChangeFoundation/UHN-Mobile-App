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

// fake data
const fakeResponders = [
  "a",
  "aa",
  "ab",
  "b",
  "ba",
  "bb",
  "bc",
  "c",
  "ca",
  "cb",
  "cc",
];

class RemoveRespondersScreen extends Component {
  constructor(props) {
    super(props);
    // TODO: fetch all responders for this user
    let responderSelectionMap = new Map();
    for (username of fakeResponders) {
      responderSelectionMap.set(username, false);
    }
    this.state = {
      responderSelectionMap: responderSelectionMap,
      allResponders: fakeResponders,
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
    let selectedResponders = [];
    for (let [username, isSelected] of this.state.responderSelectionMap) {
      if (isSelected) {
        selectedResponders.push(username);
      }
    }
    // TODO: ping backend to remove the usernames in selectedResponders from this user's profile
    
    Actions.pop();
  }

  modalHeader = "Removing responders";
  modalFooterLeft = (<Button variant="secondary" onPress={() => this.setState({modalVisible: false})}>Cancel</Button>);
  modalFooterRight = (<Button variant="primary" style={{backgroundColor: theme.colors.red}} onPress={() => this.removeSelectedResponders()}>Remove</Button>);

  render() {
  modalBody = (<List style={styles.list}>
                {
                  (this.state.modalVisible) &&
                    this.state.allResponders.map((username, index) => {
                      if (this.state.responderSelectionMap.get(username)) {
                        return (
                          <ListItem key={index} leftText={username} />
                        );
                      }
                    })
                }
              </List>);

    return (
      <Container>
        <Modal
          modalVisible={this.state.modalVisible}
          modalHeader={this.modalHeader}
          modalBody={modalBody}
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
            {
                this.state.allResponders.map((username, index) => {
                  return (
                    <View style={styles.row} key={index}>
                      <Checkbox checked={this.state.responderSelectionMap.get(username)}
                        onPress={() => this.onCheckboxPress(username)} />
                      <ListItem
                        leftText={username}
                      />
                    </View>
                  );
                })
            }
          </List>

          <View style={styles.removeButton}>
            <Button variant="primary" style={{backgroundColor: theme.colors.red}}
            onPress={() => this.setState({modalVisible: true})}>remove selected</Button>
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