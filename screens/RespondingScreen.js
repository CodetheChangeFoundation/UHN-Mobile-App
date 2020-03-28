import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Content,
  Header,
  View,
  Segment,
  Banner,
  List,
  ListItem
} from "../components/layout";
import { Switch } from "../components/buttons";
import { Text } from "../components/typography";
import theme from "../styles/base";
import { connect } from "react-redux";
import { setStatus } from "../store/actions";
import { getWatchingFor } from "../services/user.service";

const RespondingScreen = props => {
  const [usernames, setUsernames] = useState(null);

  // Fetches the list of usernames this user responds to
  const fetchWatchingFor = () => {
    getWatchingFor(props.auth.userId, props.auth.token).then(response => {
      if (response) {
        const watchingForUsers = response.data.respondingTo;
        const usernames = watchingForUsers.map(user => user.username);
        setUsernames(usernames);
      }
    });
  };

  useEffect(() => {
    if (!usernames) {
      fetchWatchingFor();
    }
    // TODO: send the updated availiabilty status
  });

  return (
    <Container>
      <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>
        Responding Mode
      </Header>

      <Content>
        <Banner>
          <Segment
            active="right"
            leftText="using"
            rightText="responding"
            onLeftButtonPress={() => Actions.using()}
          />
        </Banner>

        <View style={styles.setAvailability}>
          <Text>I am available with Naloxone</Text>
          <Switch
            style={styles.availabilitySwitch}
            value={props.naloxoneAvailability}
            onValueChange={() => {
              if (props.naloxoneAvailability) {
                props.setStatus(props.auth.userId, props.auth.token, {
                  naloxoneAvailability: false
                });
              } else {
                props.setStatus(props.auth.userId, props.auth.token, {
                  naloxoneAvailability: true
                });
              }
            }}
          />
        </View>

        <View style={styles.watchingFor}>
          <Text>I am watching for</Text>
        </View>

        <List style={styles.list}>
          {!!usernames && usernames.length > 0 ? (
            usernames.map(username => {
              return <ListItem key={username} leftText={username} />;
            })
          ) : (
            <Text style={styles.emptyListText}>No users.</Text>
          )}
        </List>
      </Content>
    </Container>
  );
};

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
  },
  emptyListText: {
    fontFamily: theme.fonts.header,
    color: theme.colors.lightGrey
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    naloxoneAvailability: state.userData.naloxoneAvailability
  };
};

export default connect(mapStateToProps, { setStatus })(RespondingScreen);
