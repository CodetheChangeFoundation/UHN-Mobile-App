import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { WebViewLeaflet } from "react-native-webview-leaflet";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Button, IconButton } from "../components/buttons";
import { Form, Input } from "../components/forms";
import { Text } from "../components/typography";
import theme from "../styles/base";
import {
    getDeviceLocationAsync,
    convertToCoordinates,
    convertToAddressAsync,
    updateUserLocation
} from "../utils/index";
import { setLocalLocation } from "../store/actions";

import mapMarkerIcon from "../components/icons/mapMarker";

const INITIAL_COORDINATES = {
     // Default location is set to Vancouver
     lat: 49.2827,
     lng: -123.1207
};

const openStreetMapLayer = {
    attribution:'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    baseLayerIsChecked: true,
    baseLayerName: "OpenStreetMap.Mapnik",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const LocationScreen = (props) => {
    const [webViewLeafletRef, setWebViewLeafletRef] = useState(null);
    const [mapCenterPosition, setMapCenterPosition] = useState(INITIAL_COORDINATES);
    const [mapZoom, setMapZoom] = useState(7);
    const [mapLayers, setMapLayers] = useState(null);
    const [mapMarkers, setMapMarkers] = useState([]);

    const [address, setAddress] = useState("Loading current location...");
    const [note, setNote] = useState(null);

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (!props.location?.coords?.lat || !props.location?.coords?.lng) {
            // No location in Redux --  use current device location
            refreshDeviceLocation();
        } else {
            // Use location data from Redux
            convertToAddressAsync({ latitude: props.location.coords.lat, longitude: props.location.coords.lng })
                .then((address) => {
                  setAddress(address);
                  setMapLocation(props.location.coords)
                  setNote(props.location.note);
                })
        }
    }, [props.location, props.userId, props.token]);

    // Function to get device location
    // Sets map coordinates
    const refreshDeviceLocation = () => {
        setAddress("Loading current location...");
        getDeviceLocationAsync()
        .then((coords) => {
          setMapLocation({ lat: coords.lat, lng: coords.lng });
          return convertToAddressAsync({ latitude: coords.lat, longitude: coords.lng });
        })
        .then((address) => {
            setAddress(address);
        })
    }

    // Function to setup map layers
    const mapLoad = () => {
        setMapLayers([openStreetMapLayer]);
    };

    // Function to set map location
    const setMapLocation = (location) => {
        const { lat, lng } = location;
        // Set new location and map zoom
        setMapCenterPosition({ lat, lng });
        setMapZoom(18);
        setMapMarkers([{
            icon: mapMarkerIcon,
            position: { lat, lng },
            name: "Current Location"
        }]);
    };

    // Submit handler
    // Converts string address to coordinates and updates online and redux db
    const handleConfirm = () => {
        const { userId: id, token } = props;
        setLoading(true);
        convertToCoordinates(address, (coords) => {
            const location = {
              coords: {
                lat: coords.lat,
                lng: coords.lng
              },
              note
            };
            props.setLocalLocation(location);
            updateUserLocation({ id, token, data: location });
            setLoading(false);
            Actions.using();
        },
        () => setLoading(false));
    };

    let notesInputRef = React.createRef();

  return (
    <Container>
    <Header leftButton="arrow" onLeftButtonPress={() => Actions.main()}>Location</Header>

    <Content>
        <View style={styles.row}>
            <Text>Please confirm your location</Text>
            <IconButton variant="icon" name="md-refresh" size={20} style={styles.refreshIcon} onPress={refreshDeviceLocation}/>
        </View>
        <View style={styles.map}>
            <WebViewLeaflet
                doShowDebugMessages={false}
                ref={(component) => { setWebViewLeafletRef(component) }}
                mapLayers={mapLayers}
                mapCenterPosition={mapCenterPosition}
                mapMarkers={mapMarkers}
                onLoadEnd={mapLoad}
                onMessageReceived={() => null}
                zoom={mapZoom}
            />
        </View>
        <Form style={styles.form}>
            <Input
                variant="text"
                onChangeText={text => setAddress(text)}
                placeholder="Enter address"
                value={address}
                itemStyle={styles.inputItem}
                style={styles.inputText}
                hasNext
                multiline
                onSubmitEditing={() => { notesInputRef._root.focus() }}
            />
            <Input
                ref={(input) => notesInputRef = input}
                variant="text"
                onChangeText={text => setNote(text)}
                placeholder='Note, e.g. "2nd floor"'
                value={note}
                itemStyle={styles.inputItem}
                style={styles.inputText}
                multiline
                onSubmitEditing={ handleConfirm }
            />
        </Form>

        <View style={styles.searchButton}>
            <Button
              variant="affirmation"
              size="medium"
              onPress={handleConfirm}
              disabled={loading}
              loadingText="wait..."
            >
              confirm
            </Button>
        </View>
    </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    flex: 0
  },
  refreshIcon: {
    marginLeft: 10
  },
  map: {
    flex: 1,
    marginVertical: 20
  },
  form: {
    flex: 0,
  },
  inputItem: {
    marginLeft: 0,
    marginTop: 0
  },
  inputText: {
    height: "auto",
    paddingBottom: 0,
    top: 0
  },
  searchButton: {
    flex: 0
  }
});

const mapStateToProps = (state, currentProps) => {
    const { token, userId } = state.auth;
    const { location } = state.userData;
    return { ...currentProps, token, userId, location };
};

export default connect(mapStateToProps, { setLocalLocation })(LocationScreen);