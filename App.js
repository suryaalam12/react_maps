import React from "react";
import { View } from "react-native";
import styles from "./header"; // Ensure the correct path
import MyMap from "./map_function";
import Koneksi from "./koneksi"; // Ensure the correct path

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}></View>

      <View style={styles.mapContainer}>
        <MyMap />
      </View>
      <Koneksi />
    </View>
  );
}
