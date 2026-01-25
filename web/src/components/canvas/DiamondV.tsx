"use client";

import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import React, { useMemo, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { WebGLRenderTarget, Object3D } from "three";
import BackfaceMaterial from "./materials/BackfaceMaterial";
import RefractionMaterial from "./materials/RefractionMaterial";
import lerp from "lerp";

const dummy = new Object3D();

// Sample code configuration adapted
const state = {
   diamonds: [
      { x: 0, offset: 0.15, pos: new THREE.Vector3(), scale: 14, factor: 4 }
   ]
};

export default function Diamonds() {
   // @ts-ignore
   const { nodes } = useLoader(GLTFLoader, "/diamond.glb");
   // @ts-ignore
   useLayoutEffect(() => {
      if (nodes.pCone1_lambert1_0) {
         (nodes.pCone1_lambert1_0 as THREE.Mesh).geometry.center();
      }
   }, [nodes]);

   const { size, gl, scene, camera, clock } = useThree();
   const model = useRef<THREE.InstancedMesh>(null);
   const ratio = Math.min(gl.getPixelRatio(), 1); // Optimized for stability

   const [envFbo, backfaceFbo, backfaceMaterial, refractionMaterial] = useMemo(() => {
      const envFbo = new WebGLRenderTarget(size.width * ratio, size.height * ratio);
      const backfaceFbo = new WebGLRenderTarget(size.width * ratio, size.height * ratio);
      const backfaceMaterial = new BackfaceMaterial();
      const refractionMaterial = new RefractionMaterial({
         envMap: envFbo.texture,
         backfaceMap: backfaceFbo.texture,
         resolution: [size.width * ratio, size.height * ratio]
      });
      return [envFbo, backfaceFbo, backfaceMaterial, refractionMaterial];
   }, [size, ratio]);

   useFrame(() => {
      if (!model.current) return;

      state.diamonds.forEach((data, i) => {
         const t = clock.getElapsedTime() / 2;
         const { x, offset, scale, factor } = data;
         // const s = (contentMaxWidth / 35) * scale; // Simplification without useBlock
         const s = scale;

         // Adaptation of position logic
         // data.pos.set(mobile ? 0 : x, lerp(data.pos.y, -sectionHeight * offset * factor + (state.top.current / state.zoom) * factor, 0.1), 0)
         // Simplifying movement for standalone demo without 'blocks' system
         // Compacted vertical spread (offset * -1.5) so they leave screen faster on scroll
         data.pos.set(x, Math.sin(t + i) + (offset * -1.5), 0);

         dummy.position.copy(data.pos);
         if (i === state.diamonds.length - 1) dummy.rotation.set(0, t, 0);
         else dummy.rotation.set(t, t, t);
         dummy.scale.set(s, s, s);
         dummy.updateMatrix();
         model.current!.setMatrixAt(i, dummy.matrix);
      });
      model.current.instanceMatrix.needsUpdate = true;

      // FBO Render Loop
      gl.autoClear = false;
      camera.layers.set(0);
      gl.setRenderTarget(envFbo);
      gl.clearColor();
      gl.render(scene, camera);
      gl.clearDepth();

      camera.layers.set(1);
      model.current.material = backfaceMaterial;
      gl.setRenderTarget(backfaceFbo);
      gl.clearDepth();
      gl.render(scene, camera);

      camera.layers.set(0);
      gl.setRenderTarget(null);
      gl.render(scene, camera);
      gl.clearDepth();

      camera.layers.set(1);
      model.current.material = refractionMaterial;
      gl.render(scene, camera);
   }, 1);

   return (
      // @ts-ignore
      <instancedMesh ref={model} layers={1} args={[(nodes.pCone1_lambert1_0 as THREE.Mesh).geometry, null, state.diamonds.length]} position={[0, 0, 0]} />
   );
}


