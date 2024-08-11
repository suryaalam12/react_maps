import React, { useState, useEffect, useRef } from "react";
import { Text, TouchableOpacity, View, Alert, Linking } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import styles from "./header";
import Sidebar from "./sidebar";
import { useFetchMarkers } from "./refreshLayer";

export default function MyMap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [coordinates, setCoordinates] = useState("");
  const mapRef = useRef(null);
  const { markers, fetchMarkers } = useFetchMarkers();
  useEffect(() => {
    fetchMarkers(); // Fetch markers on component mount
  }, []);

  const handleLocatePress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      Alert.alert(
        "Permission Denied",
        "Allow location access to use this feature."
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  const openStreetView = () => {
    if (location) {
      const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.latitude},${location.longitude}`;
      Linking.openURL(streetViewUrl);
    }
  };

  const toggleSidebar = () => {
    if (location) {
      const lat = formatCoordinate(location.latitude);
      const lng = formatCoordinate(location.longitude);
      setCoordinates(`${lat}, ${lng}`);
    }
    setSidebarVisible(!sidebarVisible);
  };

  const formatCoordinate = (coordinate) => {
    return coordinate.toFixed(6);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -6.1,
          longitude: 106.816666,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            draggable
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setLocation({ latitude, longitude });
            }}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>Lokasi Anda</Text>
                <Text style={styles.calloutDescription}>
                  {`${formatCoordinate(location.latitude)} ${formatCoordinate(
                    location.longitude
                  )}`}
                </Text>
              </View>
            </Callout>
          </Marker>
        )}

        {markers.map((marker) => (
          <Marker key={marker.id} coordinate={marker.coordinates}>
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.locateButton} onPress={handleLocatePress}>
        <Text style={styles.locateButtonText}>Lokasi Anda</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.streetViewButton}
        onPress={openStreetView}
      >
        <Text style={styles.locateButtonText}>Street View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.unggahButton} onPress={toggleSidebar}>
        <Text style={styles.locateButtonText}>Unggah Data</Text>
      </TouchableOpacity>
      {sidebarVisible && <Sidebar coordinates={coordinates} />}
    </View>
  );
}
