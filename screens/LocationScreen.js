import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { WebViewLeaflet } from 'react-native-webview-leaflet'

import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Button } from "../components/buttons";
import { Form, Input } from "../components/forms"
import { Text } from "../components/typography"
import theme from '../styles/base'
import { getLocation, convertToCoordinates } from '../utils/index'

import mapMarkerIcon from '../components/icons/mapMarker'

const openStreetMapLayer = {
    attribution:'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    baseLayerIsChecked: true,
    baseLayerName: "OpenStreetMap.Mapnik",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

const LocationScreen = () => {
    const [webViewLeafletRef, setWebViewLeafletRef] = useState(null)
    const [mapCenterPosition, setMapCenterPosition] = useState({
        // Default location is set to Vancouver
        lat: 49.2827,
        lng: -123.1207
    })
    const [mapZoom, setMapZoom] = useState(7)
    const [mapLayers, setMapLayers] = useState(null)
    const [mapMarkers, setMapMarkers] = useState([])

    const [address, changeAddress] = useState(null)
    const [addressConfirm, setAddressConfirm] = useState(false) 
    const [notes, changeNotes] = useState(null)

    const [recentAddresses, setRecentAddresses] = useState([])
    
    useEffect(() => {
        setRecentAddresses([
            "3087 West 38th Ave Vancouver",
            "Vancouver, V6T 1Z4"
        ])
        getLocation(setLocation)
    }, [])

    const mapLoad = () => {
        setMapLayers([openStreetMapLayer])
    }

    const setLocation = (location) => {
        const { latitude, longitude } = location
        // Set new location and map zoom
        setMapCenterPosition({ lat: latitude, lng: longitude })
        setMapZoom(18)
        setMapMarkers([{
            icon: mapMarkerIcon,
            position: { lat: latitude, lng: longitude },
            name: "Current Location"
        }])
    }

    const onMessageReceived = (message) => {
        // console.log("App Recieved", message)
    }

    const pickRecent = (num) => {
        convertToCoordinates(recentAddresses[num], setLocation)
        setAddressConfirm(true)
    }

    const handleSave = () => {
        if(addressConfirm) {
            /***
             * Need a way to update database with:
             * (a) current address
             * (b) most recent addresses
             * (c) note
             */
            Actions.using()
        } else {
            convertToCoordinates(address, setLocation)
            setAddressConfirm(true)
        }
    }

  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Location</Header>

    <Content>
        <Text style={{margin: 10}}>Please confirm your location</Text>
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
        <Form style={styles.inputWrapper}>
            <Input label=""
                variant="text"
                onChangeText={text => { setAddressConfirm(false); changeAddress(text) }}
                placeholder="Enter Address"
                value={address}
            />
            <Input label=""
                variant="text"
                onChangeText={text => changeNotes(text)}
                placeholder="notes"
                value={notes}
            />

            <Text style={{marginVertical: 20, width: "80%", height: 20}}>Recent Locations:</Text>
            <TouchableOpacity onPress={() => {pickRecent(0)}}>
                <TextInput  editable={false}
                            style={styles.clickableText}
                            pointerEvents="none"
                >{recentAddresses[0]}</TextInput>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {pickRecent(1)}}>
                <TextInput  editable={false}
                            style={styles.clickableText}
                            pointerEvents="none"
                >{recentAddresses[1]}</TextInput>
            </TouchableOpacity>
        </Form>

        <View style={styles.saveButton}>
            <Button variant="alarm" onPress={handleSave}>{addressConfirm ? 'confirm' : 'save'}</Button>
         </View>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 3,
    width: "100%",
    height: "30%",
  },
  inputWrapper: {
      width: "100%",
      flex: 6,
  },
  clickableText: {
    height: 40,
    width: "80%",
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    padding: 10,
    margin: 5,
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.darkGrey,
  },
  saveButton: {
    flex: 3,
  },
});

export default LocationScreen;