"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Preload } from "@react-three/drei";
import { Suspense } from "react";

interface SceneProps {
   children: React.ReactNode;
   className?: string;
   cameraPosition?: [number, number, number];
}

export default function ScenePerspective({ children, className, cameraPosition = [0, 1.5, 9] }: SceneProps) {
   return (
      <div className={`relative h-screen w-full ${className}`}>
         <Canvas
            camera={{ fov: 50, position: cameraPosition }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
         >
            <Suspense fallback={null}>
               <color attach="background" args={['#000000']} />
               <Environment preset="city" />
               <ambientLight intensity={0.5} />
               <pointLight position={[10, 10, 10]} intensity={1} />
               {children}
               <Preload all />
            </Suspense>
         </Canvas>
      </div>
   );
}
