import {
    ViroMaterials,
    Viro3DObject,
    ViroNode,
    ViroAnimations,
  } from "@viro-community/react-viro";
  import React, { useState } from "react";
  import { ViroPinchState } from "@viro-community/react-viro/dist/components/Types/ViroEvents";
  
  function Object3D(url: string) {
    const [scaleNumber, setScaleNumber] = useState(1);
  
    function scaleObject(pinchState: ViroPinchState, scaleFactor: number): void {
      if (pinchState === 2) {
        setScaleNumber(scaleFactor);
      }
    }
    ViroMaterials.createMaterials({
      label: {
        lightingModel: "Blinn",
        diffuseColor: "rgba(171,171,171,1)",
        writesToDepthBuffer: true,
        readsFromDepthBuffer: true,
      },
    });
  
    return (
      <Viro3DObject
        source={{uri: "http://hehe.glb"}}
        type="GLB"
        position={[0, 0, -1]}
        onPinch={scaleObject}
        scale={[scaleNumber, scaleNumber, scaleNumber]}
        onDrag={() => {}}
        rotation={[0, 180, 0]}
      />
    );
  }
  
  export default Object3D;
  