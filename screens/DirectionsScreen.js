import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { WebViewLeaflet } from "react-native-webview-leaflet";

import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Button } from "../components/buttons";
import { Text } from "../components/typography";
import theme from "../styles/base";
import { convertToAddress } from "../utils/index";
import { dismissNotification } from "../store/actions";
import { updateStatusOfHelpRequest } from "../services/help-request.service";

import mapMarkerIcon from "../components/icons/mapMarker";

const DEFAULT_COORDINATES = { lat: 43.6536212, lng: -79.3751693 };

const openStreetMapLayer = {
  attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  baseLayerIsChecked: true,
  baseLayerName: "OpenStreetMap.Mapnik",
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const DirectionsScreen = props => {
  const [webViewLeafletRef, setWebViewLeafletRef] = useState(null);
  const [mapCenterPosition, setMapCenterPosition] = useState(DEFAULT_COORDINATES);
  const [mapZoom, setMapZoom] = useState(7);
  const [mapLayers, setMapLayers] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);

  const [address, setAddress] = useState(null);
  const [note, setNote] = useState(null);
  const [client, setClient] = useState(null);
  const [helpRequestId, setHelpRequestId] = useState(null);

  useEffect(() => {
    const currentNotification = props.notification.notificationQueue[0];

    if (!currentNotification) {
      Actions.alert({
        alertTitle: "Sorry! Data on this help request cannot be found!",
        alertBody: "You will be re-directed back to the main menu",
        positiveButton: { text: "OK", onPress: () => Actions.main() },
        cancelable: false
      });

      return;
    }

    const { username, location } = currentNotification.user;
    const { coords, note } = location;

    setLocation(currentNotification.user.location.coords);
    convertToAddress(coords, setAddress);
    setNote(note);
    setClient(username);
    setHelpRequestId(currentNotification.helpRequestId);
  }, []);

  const mapLoad = () => {
    setMapLayers([openStreetMapLayer]);
  };

  const setLocation = location => {
    const { lat, lng } = location;
    // Set new location and map zoom
    setMapCenterPosition({ lat, lng });
    setMapZoom(18);
    setMapMarkers([
      {
        icon: mapMarkerIcon,
        position: { lat, lng },
        name: "Current Location"
      }
    ]);
  };

  const onMessageReceived = message => {
    // console.log("App Recieved", message)
  };

  const handleArrived = () => {
    updateStatusOfHelpRequest(props.token, "arrived", helpRequestId);
    props.dismissNotification();
    
    //TODO: arrival log create

    Actions.alert({
      alertTitle: `Thank you for attending to ${client}!`,
      alertBody: "You will be re-directed back to the main menu",
      positiveButton: { text: "OK", onPress: () => Actions.main() },
      cancelable: false
    });
  };

  return (
    <Container>
      <Header onLeftButtonPress={() => Actions.drawerOpen()}>Directions</Header>

      <Content>
        <View style={styles.map}>
          <WebViewLeaflet
            doShowDebugMessages={false}
            ref={component => {
              setWebViewLeafletRef(component);
            }}
            mapLayers={mapLayers}
            mapCenterPosition={mapCenterPosition}
            mapMarkers={mapMarkers}
            onLoadEnd={mapLoad}
            onMessageReceived={onMessageReceived}
            zoom={mapZoom}
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.supportText}>{client}'s location:</Text>
          <Text style={styles.addressText}>{address}</Text>
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.supportText}>Extra information:</Text>
          <Text style={styles.noteText}>{note}</Text>
        </View>

        <View style={styles.arrivedButton}>
          <Button variant="affirmation" size="large" onPress={handleArrived}>
            I've arrived
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 5,
    width: "100%",
    height: "50%"
  },
  textWrapper: {
    marginTop: 20
  },
  supportText: {
    textAlign: "left",
    color: theme.colors.lightGrey,
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.small
  },
  addressText: {
    textAlign: "center",
    height: 50,
    width: "100%",
    padding: 10,
    margin: 5,
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.large,
    color: theme.colors.darkGrey
  },
  noteText: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.darkGrey
  },
  arrivedButton: {
    flex: 3
  }
});

const mapStateToProps = (state, currentProps) => {
  const { token, userId } = state.auth;
  const notification = state.notification;
  return { ...currentProps, token, userId, notification };
};

export default connect(mapStateToProps, { dismissNotification })(DirectionsScreen);
