import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    height: 60,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    padding: 10,
    marginTop: 24,
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bolder",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Ensure the map fills its container
  },
  locateButton: {
    position: "absolute",
    bottom: 30,
    left: 10,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  locateButtonText: {
    color: "white",
    fontSize: 16,
  },
  streetViewButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  unggahButton: {
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});
