import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { useHandlePress } from "./refreshLayer"; // Import the hook

const Sidebar = ({ onOpenCamera, coordinates, capturedImage }) => {
  const [petugas, setPetugas] = useState("");
  const [titikLokasi, setTitikLokasi] = useState(coordinates);
  const [tipeIklan, setTipeIklan] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const { handlePress } = useHandlePress(); // Initialize the handlePress function

  if (!isSidebarVisible) {
    return null;
  }

  return (
    <View style={styles.sidebar}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gambar</Text>
          {capturedImage && (
            <Image
              source={{ uri: capturedImage }}
              style={styles.capturedImage}
            />
          )}
          <TouchableOpacity style={styles.sidebarButton} onPress={onOpenCamera}>
            <Text style={styles.sidebarButtonText}>Ambil Gambar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Petugas</Text>
          <TextInput
            style={styles.input}
            value={petugas}
            onChangeText={setPetugas}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Titik Lokasi</Text>
          <TextInput
            style={styles.input}
            value={titikLokasi}
            onChangeText={setTitikLokasi}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipe Iklan</Text>
          <TextInput
            style={styles.input}
            value={tipeIklan}
            onChangeText={setTipeIklan}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ukuran</Text>
          <TextInput
            style={styles.input}
            value={ukuran}
            onChangeText={setUkuran}
          />
        </View>
        <TouchableOpacity
          style={styles.sidebarButton}
          onPress={() =>
            handlePress(
              petugas,
              titikLokasi,
              setPetugas,
              setTitikLokasi,
              setIsSidebarVisible
            )
          }
        >
          <Text style={styles.sidebarButtonText}>Unggah Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: 270,
    backgroundColor: "white",
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sidebarButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5,
  },
  sidebarButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  capturedImage: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
});

export default Sidebar;
