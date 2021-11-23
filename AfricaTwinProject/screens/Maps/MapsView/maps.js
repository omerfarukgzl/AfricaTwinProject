import React, { useState, useEffect, useRef } from 'react';
import UserLocations from '../../../MapUsers';
import { Text, View, TouchableOpacity, Linking, Alert, } from 'react-native';
import styles from './mapsStyles.styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';
import Geolocation from "react-native-geolocation-service";
import Loading from '../../Loading';

const Maps = (props) => {
  const [user, setUser] = useState(props.route.params.user);
  const [users, setUsers] = useState(new UserLocations().usersLocations);
  const [isClickLocationButton, setIsClickLocationButton] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [userLatitude, setUserLatitude] = useState(38.963745);
  const [userLongitude, setUserLongitude] = useState(35.243322);
  const [latitude, setLatitude] = useState(38.963745);
  const [longitude, setLongitude] = useState(35.243322);
  const [latitudeDelta, setLatitudeDelta] = useState(1.00);
  const [longitudeDelta, setLongitudeDelta] = useState(20.00);
  const [loading, setLoading] = useState(true);

  const mapRef = useRef();

  useEffect(() => {
    setLoading(false);
  }, [userLatitude]);

  function GetLocation() {
    Geolocation.getCurrentPosition(
      position => {
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
        setLatitudeDelta(0.05);
        setLongitudeDelta(0.05);
        setFirstClick(true);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true /*timeout: 20000, maximumAge: 1000*/ }
    );
  };
  const LocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "This App needs access to your location so you can add your location.",
          // buttonNeutral: "Ask Me Later",
          // buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsClickLocationButton(true);
        setLoading(true);
        GetLocation();
      } else {
        Linking.openSettings();
        return;
      }
    } catch (err) {
      console.warn(err);
    }
  };
  function changeRegionControl(region)
  {
    setFirstClick(false);
    setLatitude(region.latitude);
    setLongitude(region.longitude);
    setLongitudeDelta(region.longitudeDelta);
    setLatitudeDelta(region.latitudeDelta);
    console.log(region.latitudeDelta,"kkkkk",region.longitudeDelta);

  };
  function changeLocationControl(coord)
  {
    setUserLatitude(coord.latitude);
    setUserLongitude(coord.longitude);
  };

  function Maps_Locations(latitude, longitude, userLatitude,userLongitude, latitudeDelta, longitudeDelta, userLocationBool) {
    console.log(latitudeDelta, longitudeDelta, "xxxxxxxxxxxxx");
    return (
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.maps}
        region={!firstClick?{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }:{
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        loadingEnabled={true}
        showsMyLocationButton={true}
        showsUserLocation={userLocationBool}
        followsUserLocation={true}
        showsCompass={true}
        maxZoomLevel={19}
        onRegionChangeComplete={changeRegion=>changeRegionControl(changeRegion)}
        onUserLocationChange={changeLocation=>changeLocationControl(changeLocation.nativeEvent.coordinate)}
      >
        {users.map((item) => {
          return (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              image={require('../../../assets/users_pin.png')}
              title={item.username}
              description={item.name + "  "+item.plate}
            />)
        })
        }
        {isClickLocationButton ? AddUserLocation(userLatitude, userLongitude) : null}
      </MapView>
    );
  };
  function AddUserLocation(latitude, longitude) {
    return (
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        image={require('../../../assets/users_pin.png')}
        title={user.username}
        description={user.name_surname}
      />
    );
  };
  function AddLocationButton(bool) {
    return (
      <TouchableOpacity
        disabled={bool}
        onPress={LocationPermission}
        style={styles.locationAdButton}>
        <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {!isClickLocationButton ? Maps_Locations(latitude,longitude,userLatitude, userLongitude, latitudeDelta,longitudeDelta, false) : Maps_Locations(latitude,longitude,userLatitude, userLongitude, latitudeDelta, longitudeDelta, true)}
      {!isClickLocationButton ? AddLocationButton(false) : AddLocationButton(true)}
      {loading ? <Loading></Loading> : null}
    </View>
  );
};
export default Maps;