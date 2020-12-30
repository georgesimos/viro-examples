/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
  ViroNode,
  ViroOmniLight,
  ViroQuad,
  ViroSpotLight,
} from "react-viro";

export default class ARPosterScene extends Component {
  constructor(props) {
    super(props);

    this.state = { loopState: false, animationName: "01", pauseUpdates: false, playAnim: false, modelAnim: false };
  }

  _onFinish = () => {
    this.setState({
      animationName: "02",
      loopState: true,
    });
  };

  _onAnchorFound = () => {
    this.setState({
      pauseUpdates: true,
      playAnim: true,
      modelAnim: true,
    });
  };

  _onModelLoad = () => {
    setTimeout(() => {
      this.setState({});
    }, 3000);
  };

  render() {
    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={200} />

        <ViroARImageMarker target={"poster"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>
          <ViroNode
            position={[0, -0.1, 0]}
            scale={[0, 0, 0]}
            rotation={[-90, 0, 0]}
            dragType="FixedToWorld"
            onDrag={() => {}}
            animation={{ name: "scaleModel", run: this.state.playAnim }}
          >
            <Viro3DObject
              onLoadEnd={this._onModelLoad}
              source={require("../assets/images/blackpanther/object_bpanther_anim.vrx")}
              resources={[
                require("../assets/images/blackpanther/object_bpanther_Base_Color.png"),
                require("../assets/images/blackpanther/object_bpanther_Metallic.png"),
                require("../assets/images/blackpanther/object_bpanther_Mixed_AO.png"),
                require("../assets/images/blackpanther/object_bpanther_Normal_OpenGL.png"),
                require("../assets/images/blackpanther/object_bpanther_Roughness.png"),
              ]}
              position={[0, -1.45, 0]}
              scale={[0.9, 0.9, 0.9]}
              animation={{
                name: this.state.animationName,
                run: this.state.modelAnim,
                loop: this.state.loopState,
                onFinish: this._onFinish,
              }}
              type="VRX"
            />
          </ViroNode>
        </ViroARImageMarker>

        <ViroOmniLight
          intensity={300}
          position={[-10, 10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30}
        />

        <ViroOmniLight
          intensity={300}
          position={[10, 10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30}
        />

        <ViroOmniLight
          intensity={300}
          position={[-10, -10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30}
        />

        <ViroOmniLight
          intensity={300}
          position={[10, -10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30}
        />

        <ViroSpotLight
          position={[0, 8, -2]}
          color="#ffffff"
          direction={[0, -1, 0]}
          intensity={50}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={20}
          castsShadow={true}
        />

        <ViroQuad rotation={[-90, 0, 0]} position={[0, -1.6, 0]} width={5} height={5} arShadowReceiver={true} />
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

ViroARTrackingTargets.createTargets({
  poster: {
    source: require("../assets/images/blackpanther/blackpanther.jpg"),
    orientation: "Up",
    physicalWidth: 0.6096, // real world width in meters
  },
});

ViroAnimations.registerAnimations({
  scaleModel: { properties: { scaleX: 1, scaleY: 1, scaleZ: 1 }, duration: 1000 },
});

module.exports = ARPosterScene;
