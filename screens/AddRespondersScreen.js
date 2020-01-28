import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, List, ListItem } from "../components/layout";
import { Checkbox, SearchBar, Input } from "../components/forms";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import theme from "../styles/base";
import { addResponders } from "../store/actions";
import { connect } from "react-redux";

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

    let myUsernames = this.props.responders.myResponders.map((responder) => {
      return responder.username;
    })

    // TODO: fetch all responder usernames and store in allUsernames
    const allUsernames = fakeUsernames;

    let allUsernamesNoDup = [];
    let usernameSelectionMap = new Map();
    for (username of allUsernames) {
      if (!myUsernames.includes(username)) {
        allUsernamesNoDup.push(username);
        usernameSelectionMap.set(username, false);
      }
    }

    this.state = {
      searchQuery: "",
      usernameSelectionMap: usernameSelectionMap,
      allUsernames: allUsernamesNoDup,
      queriedUsernames: allUsernamesNoDup
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

  gatherSelectedUsernames = () => {
    let selectedUsernames = [];
    for (let [username, isSelected] of this.state.usernameSelectionMap) {
      if (isSelected) {
        selectedUsernames.push(username);
      }
    }
    return selectedUsernames;
  }

  addSelectedUsernames = () => {
    let selectedUsernames = this.gatherSelectedUsernames();
    this.props.addResponders(selectedUsernames, this.props.responders.myResponders);
    Actions.pop();
    // setTimeout(() => {
    //   Actions.refresh({
    //     addedResponders
    //   });
    // }, 0);
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

const mapStateToProps = (state) => {
  return {
    responders: state.responders
  }
}

export default connect(mapStateToProps, { addResponders })(AddRespondersScreen);