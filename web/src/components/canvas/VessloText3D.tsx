"use client";

import { Text3D, Center, MeshTransmissionMaterial, Environment, Float, useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function VessloText3D() {
   const { viewport } = useThree();
   const materialRef = useRef<any>(null);
   const iconRef = useRef<THREE.Mesh>(null);

   // Load Vesslo Icon
   const iconTexture = useTexture("/vesslo_icon.png");

   // Responsive scale logic:
   const groupScale = Math.min(viewport.width / 5, 1.5);

   // Animation for Icon: Slow rotation
   useFrame((state, delta) => {
      if (iconRef.current) {
         iconRef.current.rotation.y += delta * 0.5;
         // Add slight X rotation for better 3D preview
         iconRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      }
   });

   return (
      <>
         {/* Lighting Setup - CLEAN & PREMIUM (Silver/White) */}
         <Environment preset="warehouse" background={false} environmentIntensity={1.2} />

         <ambientLight intensity={1.5} color="#ffffff" />
         <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={4} color="#ffffff" castShadow />
         <pointLight position={[-10, -5, -10]} intensity={2} color="#e0f2fe" />

         {/* Floating settings for Text */}
         <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[-0.05, 0.05]}>
            <group scale={[groupScale, groupScale, groupScale]}>

               {/* 1. Vesslo Text (Moved Up) */}
               <group rotation={[-0.1, 0, 0]} position={[0, 0.3, 0]}>
                  <Center top>
                     <Text3D
                        font="/fonts/droid_sans_bold.typeface.json"
                        size={1}
                        height={0.2}
                        curveSegments={48}
                        bevelEnabled
                        bevelThickness={0.12}
                        bevelSize={0.04}
                        bevelOffset={0}
                        bevelSegments={24}
                     >
                        Vesslo
                        <MeshTransmissionMaterial
                           ref={materialRef}
                           backside
                           backsideThickness={1}
                           samples={4}           // Opt: Reduced from 6 for performance
                           resolution={512}      // Opt: Reduced from 1024 for performance
                           transmission={0.95}
                           roughness={0.3}
                           thickness={2.5}
                           ior={1.5}
                           chromaticAberration={0.04}
                           anisotropy={0.0}
                           distortion={0.2}
                           distortionScale={0.2}
                           temporalDistortion={0.0}
                           color="#ffffff"
                           envMapIntensity={1.5}
                           emissive="#ffffff"
                           emissiveIntensity={0.1}
                           background={new THREE.Color('#000000')}
                        />
                     </Text3D>
                  </Center>
               </group>

               {/* 2. Vesslo Cube (Below Text, Rotating) */}
               <group position={[0, -0.8, 0]}>
                  <mesh ref={iconRef}>
                     {/* Standard BoxGeometry for perfect UV mapping */}
                     <boxGeometry args={[0.5, 0.5, 0.5]} />
                     {/* 
                        Restored White Color for brightness.
                        Added Emissive Map to make the logo self-illuminated.
                     */}
                     <meshStandardMaterial
                        map={iconTexture}
                        roughness={0.2}
                        metalness={0.5}
                        envMapIntensity={2}
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveMap={iconTexture}
                        emissiveIntensity={0.4}
                     />
                  </mesh>
               </group>

            </group>
         </Float>
      </>
   );
}
