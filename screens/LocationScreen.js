import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { WebViewLeaflet } from 'react-native-webview-leaflet'

import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Button } from "../components/buttons";
import { Form, Input } from "../components/forms"
import { Text } from "../components/typography"
import theme from '../styles/base'
import { getCurrentLocation, convertToCoordinates, convertToAddress } from '../utils/index'
import { getUserLocation, updateUserLocation } from '../store/actions';

import mapMarkerIcon from '../components/icons/mapMarker'

const INITIAL_COORDINATES = {
     // Default location is set to Vancouver
     lat: 49.2827,
     lng: -123.1207
}

const TEMPLATE_ADDRESSES = [
    '4070 West 38th Ave, Vancouver',
    '100 Universal City Plaza, Universal City, California'
]

const openStreetMapLayer = {
    attribution:'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    baseLayerIsChecked: true,
    baseLayerName: "OpenStreetMap.Mapnik",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

const LocationScreen = (props) => {
    const [webViewLeafletRef, setWebViewLeafletRef] = useState(null)
    const [mapCenterPosition, setMapCenterPosition] = useState(INITIAL_COORDINATES)
    const [mapZoom, setMapZoom] = useState(7)
    const [mapLayers, setMapLayers] = useState(null)
    const [mapMarkers, setMapMarkers] = useState([])

    const [address, setAddress] = useState(null)
    const [addressConfirm, setAddressConfirm] = useState(false) 
    const [note, setNote] = useState(null)

    const [registeredAddress, setRegisteredAddress] = useState(null)
    
    useEffect(() => {
        getCurrentLocation((coords) => {
            convertToAddress({ latitude: coords.lat, longitude: coords.lng }, setAddress)
            setLocation({ lat: coords.lat, lng: coords.lng })
        })

        getUserLocation({id: props.userId, token: props.token})
            .then( (res) => {
                if(!res.location.lat || !res.location.lng) return
                convertToAddress(res.location, setRegisteredAddress)
                setNote(res.note)
            })
            .catch( (err) => { console.error(err) })
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

    const pickRegistered = () => {
        if(!registeredAddress) return
        setAddress(registeredAddress)
        convertToCoordinates(address, setLocation)
        setAddressConfirm(true)
    }

    const handleSearch = () => {
        if(addressConfirm) {

            const params = {
                data: {
                    note: note && note
                },
                id: props.userId,
                token: props.token,
            }

            convertToCoordinates(address, (coords) => {
                params.data.lat = coords.lat
                params.data.lng = coords.lng

                updateUserLocation(params)
            })

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
                onChangeText={text => { setAddressConfirm(false); setAddress(text) }}
                placeholder="Enter Address"
                value={address}
            />
            <Input label=""
                variant="text"
                onChangeText={text => setNote(text)}
                placeholder="note"
                value={note}
            />
            { registeredAddress ? (
            <React.Fragment>
                <Text style={{marginVertical: 20, width: "80%", height: 20}}>Registered Location:</Text>
                <TouchableOpacity onPress={pickRegistered}>
                    <TextInput  editable={false}
                                style={styles.clickableText}
                                pointerEvents="none"
                    >{registeredAddress}</TextInput>
                </TouchableOpacity>
            </React.Fragment>
            ) : (
                <Text style={{marginVertical: 20, width: "80%", height: 20}}>No Registered Location Found!</Text>
            )
        }
        </Form>

        <View style={styles.searchButton}>
            <Button variant="alarm" onPress={handleSearch}>{addressConfirm ? 'confirm' : 'search'}</Button>
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
    width: "100%",
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    padding: 10,
    margin: 5,
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.darkGrey,
  },
  searchButton: {
    flex: 3,
  },
});

const mapStateToProps = (state, currentProps) => {
    const { token, userId } = state.auth;
    return { ...currentProps, token, userId }
}

export default connect(mapStateToProps)(LocationScreen);