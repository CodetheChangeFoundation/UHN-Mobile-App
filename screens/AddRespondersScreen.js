import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View, List, ListItem } from "../components/layout";
import { Checkbox, SearchBar, Input } from "../components/forms";
import { Text } from "../components/typography";
import { Button } from "../components/buttons";
import theme from "../styles/base";
import { addResponders, respondersError } from "../store/actions";
import { connect } from "react-redux";
import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';


class AddRespondersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      idSelectionMap: new Map(),
      allResponders: [],
      queriedResponders: []
    };
  }

  getAllResponders = async (token) => {
    return await axios.get(
      `${SERVER_ROOT}/users/search`, 
      {
        headers: {"Authorization": token},
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      respondersError(error);
      return [];
    });
  }

  async componentDidMount() {
    const allResponders = await this.getAllResponders(this.props.auth.token);
    const myUsernames = this.props.responders.myResponders.map((responder) => responder.username);
    let allRespondersNoDup = [];
    let idSelectionMap = new Map();
    // TODO: in a future backend fix, the responder _id field will be changed to id
    for (responder of allResponders) {
      if (!myUsernames.includes(responder.username) && (responder._id != this.props.auth.userId)) {
        allRespondersNoDup.push({id: responder._id, username: responder.username});
        idSelectionMap.set(responder._id, false);
      }
    }
    this.setState({idSelectionMap, allResponders: allRespondersNoDup, queriedResponders: allRespondersNoDup});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.searchForUsername();
    }
  }

  onCheckboxPress = (userId) => {
    let idSelectionMap = this.state.idSelectionMap;
    let oldValue = idSelectionMap.get(userId);
    idSelectionMap.set(userId, !oldValue);
    this.setState({idSelectionMap});
  }

  escapeRegex = (str) => {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  searchForUsername = () => {
    const searchQuery = this.escapeRegex(this.state.searchQuery);
    const regex = new RegExp("^" + searchQuery, "i");
    let queriedResponders = [];
    for (responder of this.state.allResponders) {
      if (regex.test(responder.username)) {
        queriedResponders.push(responder);
      }
    }
    this.setState({queriedResponders});
  }

  gatherSelectedResponderIds = () => {
    let selectedResponderIds = [];
    for (let [userId, isSelected] of this.state.idSelectionMap) {
      if (isSelected) {
        selectedResponderIds.push({id: userId});
      }
    }
    return selectedResponderIds;
  }

  addSelectedUserIds = () => {
    let selectedResponderIds = this.gatherSelectedResponderIds();
    this.props.addResponders(this.props.auth.userId, this.props.auth.token, selectedResponderIds, this.props.responders.myResponders);
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
              
                this.state.queriedResponders.map((responder, index) => {
                  return (
                    <View style={styles.row} key={responder.id}>
                      <Checkbox checked={this.state.idSelectionMap.get(responder.id)}
                        onPress={() => this.onCheckboxPress(responder.id)} />
                      <ListItem
                        leftText={responder.username}
                      />
                    </View>
                  );
                })
              
            }
          </List>

          <View style={styles.addButton}>
            <Button variant="primary" style={{backgroundColor: theme.colors.green}}
            onPress={() => this.addSelectedUserIds()}>add selected</Button>
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
    auth: state.auth,
    responders: state.responders
  }
}

export default connect(mapStateToProps, { addResponders, respondersError })(AddRespondersScreen);