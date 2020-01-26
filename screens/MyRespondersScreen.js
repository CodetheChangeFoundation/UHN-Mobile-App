import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions, Scene } from "react-native-router-flux";
import { Container, Content, Header, View, List, ListItem } from "../components/layout";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import theme from "../styles/base";

// fake data
const fakeResponders = [
  { username: "alpha", available: true },
  { username: "beta", available: false },
  { username: "charlie", available: false },
  { username: "delta", available: true },
  { username: "echo", available: false },
  { username: "foxtrot", available: false },
  { username: "golf", available: false },
  { username: "hotel", available: true },
  { username: "india", available: false },
  { username: "juliet", available: false },
  { username: "kilo", available: true },
  { username: "lima", available: false },
  { username: "mike", available: false },
];

class MyRespondersScreen extends Component {
  constructor(props) {
    super(props);
    // TODO: fetch user's responders (username + status) and store in myResponders
    const myResponders = fakeResponders;

    let availableUsernames = [];
    let unavailableUsernames = [];
    for (responder of myResponders) {
      if (responder.available) {
        availableUsernames.push(responder.username);
      } else {
        unavailableUsernames.push(responder.username);
      }
    }
    // here we can sort availableUsernames and unavailableUsernames by alphabetical order, recently added, distance away, etc
    this.state = {
      availableUsernames,
      unavailableUsernames
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.addedResponders !== prevProps.addedResponders) {
      let availableUsernames = this.state.availableUsernames;
      let unavailableUsernames = this.state.unavailableUsernames;
      for (responder of this.props.addedResponders) {
        if (responder.available) {
          if (!availableUsernames.includes(responder.username)) {
            availableUsernames.push(responder.username);
          }
        } else {
          if (!unavailableUsernames.includes(responder.username)) {
            unavailableUsernames.push(responder.username);
          }
        }
      }
      // re-sort availableUsernames and unavailableUsernames if desired
      this.setState({availableUsernames, unavailableUsernames});
    }
  }

  render() {
    return (
      <Container>
        <Header leftButton="arrow" 
        onLeftButtonPress={() => Actions.main()}
        >
          My Responders
        </Header>

        <Content>
          <List style={styles.list}>
            {
              this.state.availableUsernames.map((username, index) => {
                return (
                  <ListItem key={index}
                    leftText={username}
                    rightText="available"
                    rightTextStyle={styles.available}
                  />
                );
              })
            }
            {
              this.state.unavailableUsernames.map((username, index) => {
                return (
                  <ListItem key={index}
                    leftText={username}
                    rightText="unavailable"
                    rightTextStyle={styles.unavailable}
                  />
                );
              })
            }
          </List>

          <View style={styles.buttons}>
            <Button variant="primary">remove</Button>
            <Button variant="primary" onPress={() => Actions.add()}>add</Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 0
  },
  buttons: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: theme.layout.margin
  },
  available: {
    color: theme.colors.green
  },
  unavailable: {
    color: theme.colors.lightGrey
  }
});

export default MyRespondersScreen;