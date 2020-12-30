"use strict";

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroMaterials,
  ViroNode,
  ViroOrbitCamera,
  ViroScene,
  ViroSkyBox,
  ViroText,
} from "react-viro";

export default class HumanBodyScene extends Component {
  constructor() {
    super();

    this.state = {}; // Set initial state here
  }

  render() {
    return (
      <ViroScene style={styles.container}>
        <ViroSkyBox
          source={{
            nx: require("../assets/images/human_body/grid_bg.jpg"),
            px: require("../assets/images/human_body/grid_bg.jpg"),
            ny: require("../assets/images/human_body/grid_bg.jpg"),
            py: require("../assets/images/human_body/grid_bg.jpg"),
            nz: require("../assets/images/human_body/grid_bg.jpg"),
            pz: require("../assets/images/human_body/grid_bg.jpg"),
          }}
        />
        <ViroOrbitCamera position={[0, 0, -0]} active={true} focalPoint={[0, 0, -1]} />
        <ViroDirectionalLight direction={[0, 0, -1]} color="#ffffff" />

        <ViroAmbientLight color="#aaaaaa" />

        <ViroNode position={[0, 0, -1]}>
          <Viro3DObject source={require("../assets/images/human_body/heart.obj")} materials={["heart"]} type="OBJ" />
        </ViroNode>
        <ViroText text="Heart" position={[0.0, 0.0, -3]} style={styles.textStyle} transformBehaviors={["billboardY"]} />
      </ViroScene>
    );
  }
}

var materials = ViroMaterials.createMaterials({
  heart: {
    lightingModel: "Blinn",
    diffuseTexture: require("../assets/images/human_body/Heart_D3.jpg"),
    specularTexture: require("../assets/images/human_body/Heart_S2.jpg"),
    writesToDepthBuffer: true,
    readsFromDepthBuffer: true,
  },
});

var styles = StyleSheet.create({
  textStyle: {
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 18,
    color: "#FFFFFF",
  },
});

module.exports = HumanBodyScene;
