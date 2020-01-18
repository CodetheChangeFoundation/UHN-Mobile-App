import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, List, ListItem } from "../components/layout";
import { Checkbox, SearchBar, Input } from "../components/forms";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import theme from "../styles/base";

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

class AddRespondersScreen extends Component {
  constructor(props) {
    super(props);
    // TODO: fetch all responders (& put in alphabetical order)
    let responderSelectionMap = new Map();
    for (username of fakeResponders) {
      responderSelectionMap.set(username, false);
    }
    this.state = {
      searchQuery: "",
      responderSelectionMap: responderSelectionMap,
      allResponders: fakeResponders,
      queriedResponders: fakeResponders
    };
  }

  onCheckboxPress = (username) => {
    let responderSelectionMap = this.state.responderSelectionMap;
    let oldValue = responderSelectionMap.get(username);
    responderSelectionMap.set(username, !oldValue);
    this.setState({responderSelectionMap});
  }

  regexEscape = (str) => {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  searchForUsername = () => {
    const searchQuery = this.regexEscape(this.state.searchQuery);
    const regex = new RegExp("^" + searchQuery, "i");
    let queriedResponders = [];
    for (username of this.state.allResponders) {
      if (regex.test(username)) {
        queriedResponders.push(username);
      }
    }
    this.setState({queriedResponders});
  }

  addSelectedResponders = () => {
    let selectedResponders = [];
    for (let [username, isSelected] of this.state.responderSelectionMap) {
      if (isSelected) {
        selectedResponders.push(username);
      }
    }
    // TODO: ping backend to add the usernames in selectedResponders as responders for this user
    
    Actions.pop();
  }

  render() {
    return (
      <Container>
        <Header leftButton="arrow" 
        onLeftButtonPress={() => Actions.pop()}
        >
          Add Responders
        </Header>

        <Content>
          <View style={styles.search}>
            <SearchBar placeholder="Search for a username"
              enableClearButton
              onChangeText={(searchQuery) => this.setState({searchQuery})}
              onClearButtonPress={() => this.setState({searchQuery: ""})}
              onSubmitEditing={() => this.searchForUsername()} 
            />
          </View>

          <List style={styles.list}>
            {
              (this.state.queriedResponders.length == 0) ?
              
                <Text>No results found.</Text>
              
              :
              
                this.state.queriedResponders.map((username, index) => {
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

          <View style={styles.addButton}>
            <Button variant="primary" style={{backgroundColor: theme.colors.green}}
            onPress={() => this.addSelectedResponders()}>add selected</Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    flex: 0,
  },
  list: {
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  addButton: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: theme.layout.margin
  }
});

export default AddRespondersScreen;