"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float, Center, ContactShadows, Stage } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function IconMesh({ iconUrl, color }: { iconUrl: string, color: string }) {
   const mesh = useRef<THREE.Mesh>(null);
   const texture = useLoader(TextureLoader, iconUrl);

   useFrame((state, delta) => {
      if (mesh.current) {
         mesh.current.rotation.y += delta * 0.5;
         mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      }
   });

   return (
      <mesh ref={mesh}>
         <boxGeometry args={[2, 2, 2]} />
         {/* Apply texture to all faces */}
         <meshStandardMaterial
            map={texture}
            color={"white"}
            roughness={0.2}
            metalness={0.1}
         />
      </mesh>
   );
}

export default function AppIconViewer({ iconUrl, color }: { iconUrl: string, color: string }) {
   return (
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
         <Suspense fallback={null}>
            <Environment preset="studio" />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
               <Center>
                  <IconMesh iconUrl={iconUrl} color={color} />
               </Center>
            </Float>
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            <OrbitControlsWrapper />
         </Suspense>
      </Canvas>
   );
}

import { OrbitControls } from "@react-three/drei";
function OrbitControlsWrapper() {
   return <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />;
}
