"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, Text, Environment } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useTranslation } from "react-i18next";

function CoverItem({ index, activeIndex, item, onClick, onNavigate }: any) {
   const meshRef = useRef<THREE.Group>(null);
   const { viewport } = useThree();
   const isMobile = viewport.width < 8; // Breakpoint for 3D viewport

   // Responsive Constants
   const SCALE = isMobile ? 2.0 : 3.5;
   const SPACING_MAIN = isMobile ? 1.4 : 2.5;
   const SPACING_STACK = isMobile ? 0.3 : 0.5;
   const TEXT_SCALE_TITLE = isMobile ? 0.2 : 0.35;
   const TEXT_SCALE_DESC = isMobile ? 0.1 : 0.15;
   const TEXT_Y = -(SCALE / 2) - 0.3;

   const offset = index - activeIndex;
   const absOffset = Math.abs(offset);

   // Constants
   const X_SPACING = 2.0;
   const Z_DEPTH = 2.0;
   const ROTATION = Math.PI / 3;

   let targetX = 0;
   let targetZ = 0;
   let targetRotY = 0;

   if (offset === 0) {
      targetX = 0;
      targetZ = 1.5;
      targetRotY = 0;
   } else {
      const side = Math.sign(offset);
      targetX = (side * SPACING_MAIN) + ((offset - side) * SPACING_STACK);
      targetZ = -Z_DEPTH - (absOffset * 0.2);
      targetRotY = -side * ROTATION;
   }

   // Animation
   useFrame((state, delta) => {
      if (meshRef.current) {
         meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, delta * 5);
         meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 5);
         meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 5);
      }
   });

   const handleClick = (e: any) => {
      e.stopPropagation();
      if (index === activeIndex) {
         // Active item clicked -> Navigate
         if (onNavigate) onNavigate(item.slug);
      } else {
         // Side item clicked -> Center it
         onClick(index);
      }
   };

   return (
      <group ref={meshRef} onClick={handleClick}>
         <Image
            url={item.img}
            scale={[SCALE, SCALE]}
            transparent
            side={THREE.DoubleSide}
         />
         {/* Reflection */}
         <group position={[0, -SCALE - 0.1, 0]} scale={[1, -1, 1]}>
            <Image
               url={item.img}
               scale={[SCALE, SCALE]}
               transparent
               opacity={0.3}
               color="#555"
            />
         </group>

         {/* Title & Description */}
         {Math.abs(offset) < 0.5 && (
            <group position={[0, TEXT_Y, 0.2]}>
               <Text fontSize={TEXT_SCALE_TITLE} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff" anchorY="top" color="white" fontWeight="bold">
                  {item.title}
               </Text>
            </group>
         )}
      </group>
   );
}

export default function CoverFlow({ onAppChange, onNavigate }: { onAppChange?: (app: any) => void, onNavigate?: (slug: string) => void }) {
   const { t } = useTranslation();
   const [activeIndex, setActiveIndex] = useState(1);

   const COVER_ITEMS = [
      { title: "Vesslo", desc: t("apps.vesslo.desc_short"), img: "/vesslo_icon.png", color: "#a855f7", slug: "vesslo" },
      { title: "KeyHarbor", desc: t("apps.keyharbor.desc_short"), img: "/keyharbor-icon.png", color: "#3b82f6", slug: "keyharbor" },
      { title: "SplitSwipe", desc: t("apps.splitswipe.desc_short"), img: "/splitswipe-icon.png", color: "#f97316", slug: "splitswipe" },
      { title: "Vesslo", desc: t("apps.vesslo.desc_short"), img: "/vesslo_icon.png", color: "#a855f7", slug: "vesslo" },
      { title: "KeyHarbor", desc: t("apps.keyharbor.desc_short"), img: "/keyharbor-icon.png", color: "#3b82f6", slug: "keyharbor" },
      { title: "SplitSwipe", desc: t("apps.splitswipe.desc_short"), img: "/splitswipe-icon.png", color: "#f97316", slug: "splitswipe" },
   ];

   // Notify parent of active item change
   useEffect(() => {
      if (onAppChange && COVER_ITEMS[activeIndex]) {
         onAppChange(COVER_ITEMS[activeIndex]);
      }
   }, [activeIndex, onAppChange]);

   // Scroll handling with debounce/throttle logic embedded
   useEffect(() => {
      let lastScroll = 0;
      const handleWheel = (e: WheelEvent) => {
         const now = Date.now();

         // Support both vertical (deltaY) and horizontal (deltaX) scrolling
         // If horizontal scroll is dominant, use it. Otherwise use vertical.
         const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

         if (now - lastScroll > 50 && Math.abs(delta) > 10) {
            setActiveIndex(prev => {
               if (delta > 0) return Math.min(prev + 1, COVER_ITEMS.length - 1);
               return Math.max(prev - 1, 0);
            });
            lastScroll = now;
         }
      };
      window.addEventListener("wheel", handleWheel, { passive: true });
      return () => window.removeEventListener("wheel", handleWheel);
   }, []);

   const dragRef = useRef({ isDragging: false, startX: 0 });

   const handlePointerDown = (e: React.PointerEvent) => {
      dragRef.current.isDragging = true;
      dragRef.current.startX = e.clientX;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
   };

   const handlePointerMove = (e: React.PointerEvent) => {
      if (!dragRef.current.isDragging) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const THRESHOLD = 50;

      if (Math.abs(deltaX) > THRESHOLD) {
         setActiveIndex(prev => {
            // Drag Right (positive) -> Move content right -> Go to previous item (left)
            if (deltaX > 0) return Math.max(prev - 1, 0);
            // Drag Left (negative) -> Move content left -> Go to next item (right)
            return Math.min(prev + 1, COVER_ITEMS.length - 1);
         });
         // Reset startX to allow continuous dragging
         dragRef.current.startX = e.clientX;
      }
   };

   const handlePointerUp = (e: React.PointerEvent) => {
      dragRef.current.isDragging = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
   };

   return (
      <div
         style={{ width: '100%', height: '100vh', background: 'black', touchAction: 'none' }}
         onPointerDown={handlePointerDown}
         onPointerMove={handlePointerMove}
         onPointerUp={handlePointerUp}
         onPointerLeave={handlePointerUp}
      >
         <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Environment preset="city" />

            <group position={[0, 0.5, 0]}>
               {COVER_ITEMS.map((item, i) => (
                  <CoverItem
                     key={i}
                     index={i}
                     activeIndex={activeIndex}
                     item={item}
                     onClick={setActiveIndex}
                     onNavigate={onNavigate}
                  />
               ))}
            </group>
         </Canvas>

         <div className="absolute bottom-10 left-0 w-full text-center text-white/50 pointer-events-none">
            <p>{t('scroll_drag_click')}</p>
         </div>
      </div>
   );
}
