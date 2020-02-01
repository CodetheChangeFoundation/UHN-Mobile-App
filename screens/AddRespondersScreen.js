import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, List, ListItem } from "../components/layout";
import { Checkbox, SearchBar, Input } from "../components/forms";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import theme from "../styles/base";

// fake data
const fakeUsernames = [
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
    // TODO: fetch all responder usernames and store in allUsernames
    const allUsernames = fakeUsernames;

    let usernameSelectionMap = new Map();
    for (username of allUsernames) {
      usernameSelectionMap.set(username, false);
    }
    this.state = {
      searchQuery: "",
      usernameSelectionMap: usernameSelectionMap,
      allUsernames: allUsernames,
      queriedUsernames: allUsernames
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.searchForUsername();
    }
  }

  onCheckboxPress = (username) => {
    let usernameSelectionMap = this.state.usernameSelectionMap;
    let oldValue = usernameSelectionMap.get(username);
    usernameSelectionMap.set(username, !oldValue);
    this.setState({usernameSelectionMap});
  }

  escapeRegex = (str) => {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  searchForUsername = () => {
    const searchQuery = this.escapeRegex(this.state.searchQuery);
    const regex = new RegExp("^" + searchQuery, "i");
    let queriedUsernames = [];
    for (username of this.state.allUsernames) {
      if (regex.test(username)) {
        queriedUsernames.push(username);
      }
    }
    this.setState({queriedUsernames});
  }

  addSelectedUsernames = () => {
    let selectedUsernames = [];
    for (let [username, isSelected] of this.state.usernameSelectionMap) {
      if (isSelected) {
        selectedUsernames.push(username);
      }
    }
    // TODO: ping backend to add the usernames in selectedUsernames as responders for this user
    // response should contain the responders (username + online status) just added. store in addedResponders
    let fakeResponse = [];
    for (username of selectedUsernames) {
      fakeResponse.push({username: username, available: username.includes("a")});
    }
    
    const addedResponders = fakeResponse;
    Actions.pop();
    setTimeout(() => {
      Actions.refresh({
        addedResponders
      });
    }, 0);
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
              (this.state.queriedUsernames.length == 0) ?
              
                <Text>No results found.</Text>
              
              :
              
                this.state.queriedUsernames.map((username, index) => {
                  return (
                    <View style={styles.row} key={index}>
                      <Checkbox checked={this.state.usernameSelectionMap.get(username)}
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
            onPress={() => this.addSelectedUsernames()}>add selected</Button>
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