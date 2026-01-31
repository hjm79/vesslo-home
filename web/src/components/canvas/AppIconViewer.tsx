"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Center } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function IconMesh({ iconUrl }: { iconUrl: string }) {
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
         <meshBasicMaterial map={texture} />
      </mesh>
   );
}

export default function AppIconViewer({ iconUrl, color }: { iconUrl: string, color: string }) {
   return (
      <Canvas
         dpr={1}
         camera={{ position: [0, 0, 5], fov: 50 }}
         style={{ pointerEvents: 'none' }}
         gl={{
            antialias: false,
            powerPreference: 'high-performance',
            alpha: true,
         }}
      >
         <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
               <Center>
                  <IconMesh iconUrl={iconUrl} />
               </Center>
            </Float>
         </Suspense>
      </Canvas>
   );
}
