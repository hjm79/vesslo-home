"use client";

import * as THREE from 'three';
import { useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, ScrollControls, useScroll, Billboard, Text } from '@react-three/drei';

const APPS = [
   { slug: "vesslo", title: "Vesslo", count: 8, ext: "png" },
   { slug: "keyharbor", title: "KeyHarbor", count: 4, ext: "png" },
   { slug: "splitswipe", title: "SplitSwipe", count: 6, ext: "jpeg", extMap: { 3: "jpg", 4: "jpg", 5: "jpg", 6: "jpg" } },
];

export default function CircularGallery(props: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div style={{ width: '100%', height: '100%', background: '#111', ...props.style }} className={props.className}>
         <style jsx global>{`
           body {
             cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMCIgZmlsbD0iI0U4QjA1OSIvPjwvc3ZnPg=='), auto;
           }
         `}</style>
         <Canvas dpr={[1, 2]} camera={{ position: [0, 1.5, 9] }}>
            <ScrollControls pages={4} infinite>
               <Scene />
            </ScrollControls>
         </Canvas>
      </div>
   );
}

function Scene({ ...props }) {
   const ref = useRef<THREE.Group>(null!);
   const scroll = useScroll();
   const [activeData, setActiveData] = useState<{ url: string, title: string } | null>(null);
   const { pointer, camera } = useThree();

   useFrame((state, delta) => {
      if (ref.current) {
         ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
      }
      state.events.update?.(); // Raycasts every frame rather than on pointer-move

      // Simple camera movement based on pointer
      const targetCamX = -pointer.x * 2;
      const targetCamY = pointer.y * 2 + 4.5;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, delta * 3);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, delta * 3);
      camera.lookAt(0, 0, 0);
   });

   return (
      <group ref={ref} {...props}>
         {/* Render Cards for each App Category */}
         {APPS.map((app, i) => {
            const total = APPS.length;
            const len = Math.PI * 2 / total;
            const from = i * len;

            return (
               <Cards
                  key={i}
                  category={app.title}
                  slug={app.slug}
                  from={from}
                  len={len}
                  count={app.count}
                  ext={app.ext}
                  extMap={(app as any).extMap}
                  onHover={setActiveData}
               />
            );
         })}
         <ActiveCard activeData={activeData} />
      </group>
   );
}

interface CardsProps {
   category: string;
   slug: string;
   from?: number;
   len?: number;
   radius?: number;
   count?: number;
   ext?: string;
   extMap?: { [key: number]: string };
   onHover: (data: { url: string; title: string } | null) => void;
}

function Cards({ category, slug, from = 0, len = Math.PI * 2, radius = 5.25, count = 0, ext = "png", extMap = {}, onHover, ...props }: CardsProps) {
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
   const amount = Math.round(len * 22); // Density of cards
   const textPosition = from + (len / 2); // Center text in the segment

   return (
      <group {...props}>
         <Billboard position={[Math.sin(textPosition) * radius * 1.4, 0.5, Math.cos(textPosition) * radius * 1.4]}>
            <Text
               fontSize={0.5}
               anchorX="center"
               color="white"
               font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            >
               {category}
            </Text>
         </Billboard>
         {Array.from({ length: count }, (_, i) => { // Use dynamic count
            // Distribute images within the segment 'len'
            const angle = from + (i / Math.max(count, 1)) * len;  // Distribute evenly based on actual count
            const imgIndex = i + 1; // 1-based index
            const paddedIndex = String(imgIndex).padStart(3, '0');
            const fileExt = extMap[imgIndex] || ext;
            const url = `/circle/${slug}_circle-${paddedIndex}.${fileExt}`;

            return (
               <Card
                  key={i}
                  onPointerOver={(e: any) => {
                     e.stopPropagation();
                     setHoveredIndex(i);
                     onHover({ url, title: category });
                  }}
                  onPointerOut={() => {
                     setHoveredIndex(null);
                     onHover(null);
                  }}
                  position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
                  rotation={[0, Math.PI / 2 + angle, 0]}
                  active={hoveredIndex !== null}
                  hovered={hoveredIndex === i}
                  url={url}
               />
            );
         })}
      </group>
   );
}

interface CardProps {
   url: string;
   active: boolean;
   hovered: boolean;
   onPointerOver: (e: any) => void;
   onPointerOut: () => void;
   position: [number, number, number];
   rotation: [number, number, number];
}

function Card({ url, active, hovered, ...props }: CardProps) {
   const ref = useRef<THREE.Mesh>(null!);
   useFrame((state, delta) => {
      const f = hovered ? 1.4 : active ? 1.25 : 1;
      const targetScaleX = 1.618 * f;
      const targetScaleY = 1 * f;

      if (ref.current) {
         ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, targetScaleX, delta * 5);
         ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, targetScaleY, delta * 5);
      }
   });

   return (
      <group {...props}>
         <Image
            ref={ref as any}
            transparent
            radius={0.075}
            url={url}
            scale={[1.618, 1, 1] as any}
            side={THREE.DoubleSide}
            color={active ? "white" : "white"}
         />
      </group>
   );
}

interface ActiveCardProps {
   activeData: { url: string; title: string } | null;
}

function ActiveCard({ activeData, ...props }: ActiveCardProps) {
   const ref = useRef<THREE.Mesh>(null!);
   const [texture, setTexture] = useState<THREE.Texture | null>(null);
   const [aspect, setAspect] = useState(1);

   useEffect(() => {
      if (activeData?.url) {
         const loader = new THREE.TextureLoader();
         loader.load(activeData.url, (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace; // Ensure correct color profile
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            setTexture(tex);
            if (tex.image) {
               setAspect(tex.image.width / tex.image.height);
            }
         });
      }
   }, [activeData?.url]);

   useFrame((state, delta) => {
      if (ref.current) {
         // Animate opacity (meshBasicMaterial)
         const material = ref.current.material as THREE.MeshBasicMaterial;
         if (material) {
            const targetOpacity = activeData ? 1 : 0;
            material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 5);
            material.transparent = true; // Ensure transparent is set
         }

         const BASE_HEIGHT = 8.0;
         const MAX_WIDTH = 11.0;

         let finalHeight = BASE_HEIGHT;
         let finalWidth = finalHeight * aspect;

         if (finalWidth > MAX_WIDTH) {
            finalWidth = MAX_WIDTH;
            finalHeight = finalWidth / aspect;
         }

         const targetScaleY = activeData ? finalHeight : 0;
         const targetScaleX = activeData ? finalWidth : 0;

         ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, targetScaleX, delta * 5);
         ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, targetScaleY, delta * 5);
      }
   });

   return (
      <Billboard {...props}>
         {activeData && (
            <Text
               font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
               fontSize={0.5}
               position={[4.5, 5.0, 0]}
               anchorX="left"
               color="white"
            >
               {activeData.title}
            </Text>
         )}
         <mesh ref={ref} position={[0, 1.5, 0]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
               map={texture}
               transparent
               opacity={0}
               side={THREE.DoubleSide}
            />
         </mesh>
      </Billboard>
   );
}
