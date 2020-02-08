import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { WebViewLeaflet } from 'react-native-webview-leaflet'

import { Actions } from "react-native-router-flux";
import { Container, Content, Header, View } from "../components/layout";
import { Button, IconButton } from "../components/buttons";
import { Form, Input } from "../components/forms"
import { Text } from "../components/typography"
import theme from '../styles/base'
import {
    getDeviceLocation,
    convertToCoordinates,
    convertToAddress,
    getUserLocation,
    updateUserLocation
} from '../utils/index'
import { setLocalLocation } from '../store/actions'

import mapMarkerIcon from '../components/icons/mapMarker'

const INITIAL_COORDINATES = {
     // Default location is set to Vancouver
     lat: 49.2827,
     lng: -123.1207
}

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
    const [registeredNote, setRegisteredNote] = useState(null)
    
    useEffect(() => {
        // Gets location data from redux (device location on log in)
        convertToAddress({ latitude: props.location.coords.lat, longitude: props.location.coords.lng }, setAddress)
        setLocation(props.location.coords)

        // Get registered data from the database
        getUserLocation({id: props.userId, token: props.token})
            .then( (res) => {
                if(res.location && res.location.coords) {
                    res.location.coords.lat && res.location.coords.lng && convertToAddress(res.location.coords, setRegisteredAddress)
                    // Simply saves the note to be used later
                    res.location.note && setRegisteredNote(res.location.note)
                }
            })
            .catch( (err) => { console.error(err) })
    }, [])

    // Function to get device location
    // Sets map coordinates
    const refreshDeviceLocation = () => {
        getDeviceLocation((coords) => {
            convertToAddress({ latitude: coords.lat, longitude: coords.lng }, setAddress)
            setLocation({ lat: coords.lat, lng: coords.lng })
        })
    }

    // Function to setup map layers
    const mapLoad = () => {
        setMapLayers([openStreetMapLayer])
    }

    // Function to set map location
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

    // Handler for when the registered location is picked
    // Sets map coordinates and note
    const pickRegistered = () => {
        if(!registeredAddress) return
        setAddress(registeredAddress)
        convertToCoordinates(address, (coords) => {
            setLocation(coords)
            setNote(registeredNote)
            setAddressConfirm(true)
        }, () => {
            setAddressConfirm(false)
        })
    }

    // Handler for when user searches for an address
    // Converts string address to coordinates and sets map coordinates
    const handleSearch = () => {
        convertToCoordinates(address, (coords) => {
            setLocation(coords)
            setAddressConfirm(true)
        }, () => {
            setAddressConfirm(false)
        })
    }

    // Submit handler
    // Converts string address to coordinates and updates online and redux db
    const handleConfirm = () => {
        const params = {
            data: {
                coords: {},
                note: note && note
            },
            id: props.userId,
            token: props.token,
        }

        convertToCoordinates(address, (coords) => {
            params.data.coords.lat = coords.lat
            params.data.coords.lng = coords.lng
            updateUserLocation(params)
            props.setLocalLocation(params.data)
        })
        Actions.using()
    }

    let addressInputRef = React.createRef()
    let notesInputRef = React.createRef()


  return (
    <Container>
    <Header leftButton="menu" onLeftButtonPress={() => Actions.drawerOpen()}>Location</Header>

    <Content>
        <View style={styles.rowFlex}>
            <Text style={{margin: 10}}>Please confirm your location</Text>
            <IconButton variant="icon" name="md-refresh" size={20} onPress={refreshDeviceLocation}/>
        </View>
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
                ref={(input) => addressInputRef = input}
                variant="text"
                onChangeText={text => { setAddressConfirm(false); setAddress(text) }}
                placeholder="Enter Address"
                value={address}
                onSubmitEditing={() => {
                    if(!addressConfirm) handleSearch()
                    notesInputRef._root.focus() }}
            />
            <Input label=""
                ref={(input) => notesInputRef = input}
                variant="text"
                onChangeText={text => setNote(text)}
                placeholder="note"
                value={note}
                onSubmitEditing={addressConfirm ? handleConfirm : handleSearch}
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
            { addressConfirm ? 
                (<Button variant="alarm" onPress={handleConfirm}>confirm</Button>)
                : (<Button variant="alarm" onPress={handleSearch}>search</Button>)
            }
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
  rowFlex: {
      display: 'flex',
      flexDirection: 'row',
  }
});

const mapStateToProps = (state, currentProps) => {
    const { token, userId } = state.auth;
    const { location } = state.userData;
    return { ...currentProps, token, userId, location }
}

export default connect(mapStateToProps, { setLocalLocation })(LocationScreen);