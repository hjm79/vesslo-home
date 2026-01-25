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

import { Component, ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
   state = { hasError: false };
   static getDerivedStateFromError() { return { hasError: true }; }
   componentDidCatch(error: any) { console.error("Canvas Error:", error); }
   render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

export default function Scene({ children, className, cameraPosition = [0, 0, 5] }: SceneProps) {
   return (
      <div className={`relative h-screen w-full ${className}`}>
         <ErrorBoundary fallback={
            <div className="flex h-full w-full items-center justify-center bg-black text-white">
               <div className="text-center p-4">
                  <h2 className="text-xl font-bold mb-2">3D Error</h2>
                  <p>Graphics context lost. Please refresh the page.</p>
               </div>
            </div>
         }>
            <Canvas
               orthographic
               camera={{ zoom: 75, position: [0, 0, 500] }}
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
         </ErrorBoundary>
      </div>
   );
}
