import React, { useState, useEffect } from "react";
import {
  StyleSheet
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, Segment, Banner, List, ListItem } from "../components/layout";
import { Switch } from "../components/buttons";
import { Text } from "../components/typography";
import theme from "../styles/base";

// fake data
const fakeAvailability = true;
const fakeUsernames = [
  "pho",
  "bluebird",
  "pandy",
  "alpha1",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
];

const RespondingScreen = () => {
  // TODO: fetch availability for this user
  const [availability, setAvailability] = useState(fakeAvailability);
  // TODO: fetch list of usernames this user responds to
  const usernames = fakeUsernames;

  useEffect(() => {
    // TODO: send the updated availiabilty status
  });
  
  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Responding Mode</Header>

    <Content>
      <Banner>
        <Segment active="right"
          leftText="using" rightText="responding"
          onLeftButtonPress={() => Actions.using()}
        />
      </Banner>

      <View style={styles.setAvailability}>
        <Text>I am available with Naloxone</Text>
        <Switch 
          style={styles.availabilitySwitch}
          value={availability} 
          onValueChange={(newValue) => {setAvailability(newValue)}}
        />
      </View>

      <View style={styles.watchingFor}>
        <Text>I am watching for</Text>
      </View>

      <List style={styles.list}>
        {
          usernames.map((username) => {
            return (
              <ListItem key={username}
                leftText={username}
              />
            );
          })
        }
      </List>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  setAvailability: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: theme.layout.margin
  },
  availabilitySwitch: {
    marginLeft: theme.layout.margin
  },
  watchingFor: {
    flex: 0,
    alignSelf: "flex-start",
    marginVertical: theme.layout.margin
  },
  list: {
    flex: 0
  }
});

export default RespondingScreen;