import React, { Component } from 'react';
import { StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';

export default class App extends Component {
  state = {
    latitude: -22.2888037,
    longitude: -42.5362498,
    error: null,
  };

  componentDidMount() {
    Alert.alert(JSON.stringify(DeviceInfo.getDeviceId()));
    !PermissionsAndroid.RESULTS.GRANTED
      ? this.requestGPSPermission()
      : (this.watch = navigator.geolocation.watchPosition(
          ({ coords: { latitude, longitude } }) => {
            this.setState({ latitude, longitude, error: null });
          },
          error => {
            this.setState({ error: error.message });
          },
          {
            enableHighAccuracy: true,
          },
        ));
  }

  requestGPSPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted;
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watch);
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={
            (LatLng = {
              latitude: latitude,
              longitude: longitude,
            })
          }
          title="teste"
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
