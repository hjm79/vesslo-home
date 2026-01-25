"use client";

import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import React, { useMemo, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { Object3D } from "three";

const dummy = new Object3D();

// Simplified single diamond for Test4 - no FBO complexity
export default function DiamondSimple() {
   // @ts-ignore
   const { nodes } = useLoader(GLTFLoader, "/diamond.glb");

   // @ts-ignore
   useLayoutEffect(() => {
      if (nodes.pCone1_lambert1_0) {
         (nodes.pCone1_lambert1_0 as THREE.Mesh).geometry.center();
      }
   }, [nodes]);

   const meshRef = useRef<THREE.Mesh>(null);

   useFrame((state) => {
      if (meshRef.current) {
         const t = state.clock.getElapsedTime() / 2;
         meshRef.current.rotation.y = t;
         meshRef.current.rotation.x = Math.sin(t) * 0.1;
      }
   });

   return (
      <mesh
         ref={meshRef}
         geometry={(nodes.pCone1_lambert1_0 as THREE.Mesh).geometry}
         position={[0, 0, 0]}
         scale={14}
      >
         <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
         />
      </mesh>
   );
}
