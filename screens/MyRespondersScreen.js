import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, List, ListItem } from "../components/layout";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import theme from "../styles/base";
import { getMyResponders } from "../store/actions";
import { connect } from "react-redux";

class MyRespondersScreen extends Component {
  constructor(props) {
    super(props);
    // Updates myResponders every time this page is mounted
    this.props.getMyResponders();
    const myResponders = this.props.responders.myResponders;

    let availableUsernames = [];
    let unavailableUsernames = [];
    for (responder of myResponders) {
      if (responder.available) {
        availableUsernames.push(responder.username);
      } else {
        unavailableUsernames.push(responder.username);
      }
    }
    // Here we can sort availableUsernames and unavailableUsernames by alphabetical order, recently added, distance away, etc
    this.state = {
      availableUsernames,
      unavailableUsernames
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.responders.myResponders !== prevProps.responders.myResponders) {
      let availableUsernames = [];
      let unavailableUsernames = [];
      for (responder of this.props.responders.myResponders) {
        if (responder.available) {
          availableUsernames.push(responder.username);
        } else {
          unavailableUsernames.push(responder.username);
        }
      }
      // Sort availableUsernames and unavailableUsernames if desired
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
              (this.state.availableUsernames.length == 0 && this.state.unavailableUsernames.length == 0)
              && 
              <View>
                <Text>You currently have no responders.</Text>
              </View>
            }
            {
              this.state.availableUsernames.map((username) => {
                return (
                  <ListItem key={username}
                    leftText={username}
                    rightText="available"
                    rightTextStyle={styles.available}
                  />
                );
              })
            }
            {
              this.state.unavailableUsernames.map((username) => {
                return (
                  <ListItem key={username}
                    leftText={username}
                    rightText="unavailable"
                    rightTextStyle={styles.unavailable}
                  />
                );
              })
            }
          </List>

          <View style={styles.buttons}>
            <Button variant="dark" size="medium" onPress={() => Actions.remove()}>remove</Button>
            <Button variant="dark" size="medium" onPress={() => Actions.add()}>add</Button>
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

const mapStateToProps = (state) => {
  return {
    responders: state.responders
  }
}

export default connect(mapStateToProps, { getMyResponders })(MyRespondersScreen);