import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { WebViewLeaflet } from 'react-native-webview-leaflet'

import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Button } from "../components/buttons";
import { Text } from "../components/typography"
import theme from '../styles/base'
// import {
//     getDeviceLocation,
//     convertToCoordinates,
//     convertToAddress,
//     getUserLocation
// } from '../utils/index'

import mapMarkerIcon from '../components/icons/mapMarker'

const DEFAULT_CLIENT = 'Pho'
const DEFAULT_ADDRESS = 'Robson Square, Vancouver'
const DEFAULT_COORDINATES = { lat: 49.2827, lng: -123.1207 }
const DEFAULT_INFORMATION = 'There is a key under the mat'

const openStreetMapLayer = {
    attribution:'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    baseLayerIsChecked: true,
    baseLayerName: "OpenStreetMap.Mapnik",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

const DirectionsScreen = (props) => {
    const [webViewLeafletRef, setWebViewLeafletRef] = useState(null)
    const [mapCenterPosition, setMapCenterPosition] = useState(DEFAULT_COORDINATES)
    const [mapZoom, setMapZoom] = useState(7)
    const [mapLayers, setMapLayers] = useState(null)
    const [mapMarkers, setMapMarkers] = useState([])

    const [address, setAddress] = useState(null)
    const [note, setNote] = useState(null)

    
    useEffect(() => {

        setLocation(DEFAULT_COORDINATES)
        setAddress(DEFAULT_ADDRESS)
        setNote(DEFAULT_INFORMATION)

        // getUserLocation({id: props.userId, token: props.token})
        //     .then( (res) => {
        //         if(res.location && res.location.coords) {
        //             res.location.coords.lat && res.location.coords.lng && convertToAddress(res.location.coords, setRegisteredAddress)
        //             res.location.note && setNote(res.location.note)
        //         }
        //     })
        //     .catch( (err) => { console.error(err) })
    }, [])

    const mapLoad = () => {
        setMapLayers([openStreetMapLayer])
    }

    const setLocation = (location) => {
        const { lat, lng } = location
        // Set new location and map zoom
        setMapCenterPosition({ lat, lng })
        setMapZoom(18)
        setMapMarkers([{
            icon: mapMarkerIcon,
            position: { lat, lng },
            name: "Current Location"
        }])
    }

    const onMessageReceived = (message) => {
        // console.log("App Recieved", message)
    }

  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Directions</Header>

    <Content>
        <View style={styles.map}>
            <WebViewLeaflet
                doShowDebugMessages={false}
                ref={(component) => { setWebViewLeafletRef(component) }}
                mapLayers={mapLayers}
                mapCenterPosition={mapCenterPosition}
                mapMarkers={mapMarkers}
                onLoadEnd={mapLoad}
                onMessageReceived={onMessageReceived}
                zoom={mapZoom}
            />
        </View>

        <View style={styles.textWrapper}>
            <Text style={styles.supportText}>{DEFAULT_CLIENT}'s location:</Text>
            <Text style={styles.addressText}>{address}</Text>
        </View>

        <View style={styles.textWrapper}>
            <Text style={styles.supportText}>Extra information:</Text>
            <Text style={styles.noteText}>{note}</Text>
        </View>

        <View style={styles.arrivedButton}>
            <Button variant="alarm" onPress={() => {console.log('Arrived Pressed!')}}>I've arrived</Button>
         </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 5,
    width: "100%",
    height: "50%",
  },
  textWrapper: {
    marginTop: 20,
  },
  supportText: {
    textAlign: 'left',
    color: theme.colors.lightGrey,
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.small,
  },
  addressText: {
    textAlign: 'center',
    height: 40,
    width: "100%",
    padding: 10,
    margin: 5,
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.large,
    color: theme.colors.darkGrey,
  },
  noteText: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.darkGrey,
  },
  arrivedButton: {
    flex: 3,
  },
});

const mapStateToProps = (state, currentProps) => {
    // const { token, userId } = state.auth;
    // const { location } = state.userData;
    // return { ...currentProps, token, userId, location }
    return currentProps
}

export default connect(mapStateToProps)(DirectionsScreen);