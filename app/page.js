"use client";

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, softShadows } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// import Model from '@/public/secondGear'; // Import your 3D model component

// softShadows(); // Enable soft shadows

const Scene = () => {
  const cameraRef = useRef();

  return (
    <Canvas style={{
      width: '100vh',
      height: '100vh'
    }}>
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        fov={45}
        near={0.01}
        far={1000000}
        position={[0, 0, 10]} // Adjust camera position as needed
        ref={cameraRef}
      />
      
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[10, 10, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Model */}
      <Model />
      
      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;

const Model = () => {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, '/gearAssembly.gltf'); // Path to your GLTF model file

  return (
    <group ref={modelRef}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
};
