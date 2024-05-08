import {
  ViroMaterials,
  Viro3DObject,
  ViroSpinner,
  ViroText,
} from '@viro-community/react-viro';
import React, {useEffect, useRef, useState} from 'react';
import {ViroPinchState} from '@viro-community/react-viro/dist/components/Types/ViroEvents';

function Object3D({url}: {url: string}) {
  const [isLoading, setIsLoading] = useState(true);
  const [scaleNumber, setScaleNumber] = useState(1);

  function scaleObject(pinchState: ViroPinchState, scaleFactor: number): void {
    if (pinchState === 2) {
      setScaleNumber(scaleFactor);
    }
  }

  useEffect(() => {
    ViroMaterials.createMaterials({
      label: {
        lightingModel: 'Blinn',
        diffuseColor: 'rgba(171,171,171,1)',
        writesToDepthBuffer: true,
        readsFromDepthBuffer: true,
      },
    });
    return () => {};
  }, []);

  return (
    <>
      {isLoading && <ViroSpinner type="light" position={[0, 0, -2]} />}
      <Viro3DObject
        source={{uri: url}}
        type="GLB"
        position={[0, 0, -1]}
        onPinch={scaleObject}
        scale={[scaleNumber, scaleNumber, scaleNumber]}
        onDrag={() => {}}
        rotation={[0, 180, 0]}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
      />
      <ViroText
        text="Vui lòng chờ..."
        position={[0, -1, -2]}
        style={{color: '#fff', fontSize: 16}}
        visible={isLoading}
      />
    </>
  );
}

export default Object3D;
