import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { convertToAddress } from "../services/location-functions.service";
import { getUserInfo } from '../services/user.service'
import { connect } from "react-redux";
import theme from "../styles/base";

const DEFAULT_USER_INFO = {
  username: "",
  email: "",
  phone: ""
};

const DEFAULT_ADDRESS = "";

const ProfileScreen = (props) => {
  const [userInfo, setUserInfo] = useState(DEFAULT_USER_INFO);
  const [userAddress, setUserAddress] = useState(DEFAULT_ADDRESS);
  
  useEffect(() => {
    if (userInfo === DEFAULT_USER_INFO) {
      getUserInfo(props.userId, props.token)
        .then((response) => {
          setUserInfo(response.data);
          if (!!response.data.location) {
            console.log("location exists.")
            convertToAddress(response.data.location.coords, setUserAddress);
          } else {
            setUserAddress("Not registered");
          }
        })
    }
  })

  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>User Profile</Header>
    
    <Content>
      <View style={styles.container}>

        <View style={styles.row}>
          <Text style={styles.attribute}>Username:</Text>
          <Text style={styles.value}>{userInfo.username}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.attribute}>Email:</Text>
          <Text style={styles.value}>{userInfo.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.attribute}>Phone:</Text>
          <Text style={styles.value}>{userInfo.phone}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.attribute}>Address:</Text>
          <Text style={styles.value}>{userAddress}</Text>
        </View>

      </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  row: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: theme.layout.padding
  },
  attribute: {
    width: 100,
    marginRight: theme.layout.margin
  },
  value: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(ProfileScreen);