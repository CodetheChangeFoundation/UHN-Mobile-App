import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, List, ListItem } from "../components/layout";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import theme from "../styles/base";

// fake data
const fakeAvailableResponders = [
  "a",
  "b",
  "c"
];
const fakeUnavailableResponders = [
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
];

class MyRespondersScreen extends Component {
  constructor(props) {
    super(props);
    // TODO: fetch user's responders and status
    this.state = {
      availableResponders: fakeAvailableResponders,
      unavailableResponders: fakeUnavailableResponders
    };
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
              this.state.availableResponders.map((username, index) => {
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
              this.state.unavailableResponders.map((username, index) => {
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
            <Button variant="primary">add</Button>
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