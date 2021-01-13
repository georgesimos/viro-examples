import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ViroARSceneNavigator, ViroVRSceneNavigator } from "react-viro";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// Sets the default scene you want for AR and VR
const InitialARScene = require("./src/scenes/ARPosterScene");
const InitialVRScene = require("./src/scenes/HelloWorldScene");

const ViroApp = () => {
  const [navigatorType, setNavigatorType] = useState("UNSET"); // UNSET, AR, VR

  const SceneNavigator = navigatorType === "VR" ? ViroVRSceneNavigator : ViroARSceneNavigator;
  const initialScene = navigatorType === "VR" ? InitialVRScene : InitialARScene;
  const selectExperience = (navigatorType) => setNavigatorType(navigatorType);
  const exitViro = () => setNavigatorType("UNSET");

  return navigatorType === "UNSET" ? (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.titleText}>Choose your desired experience:</Text>

        <TouchableHighlight style={styles.buttons} onPress={() => selectExperience("MAP")} underlayColor={"#68a0ff"}>
          <Text style={styles.buttonText}>MAP</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttons} onPress={() => selectExperience("AR")} underlayColor={"#68a0ff"}>
          <Text style={styles.buttonText}>AR</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttons} onPress={() => selectExperience("VR")} underlayColor={"#68a0ff"}>
          <Text style={styles.buttonText}>VR</Text>
        </TouchableHighlight>
      </View>
    </View>
  ) : navigatorType === "MAP" ? (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      ></MapView>
    </View>
  ) : (
    <SceneNavigator initialScene={{ scene: initialScene }} onExitViro={exitViro} />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  viroContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

// ViroApp = require("./src/components/ARDrivingCar");
export default ViroApp;
