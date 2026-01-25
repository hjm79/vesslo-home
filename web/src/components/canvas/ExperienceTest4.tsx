"use client";

import { useScroll, Text, Html, Image } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Group } from "three";
import DiamondSimple from "./DiamondSimple";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "../../i18n";

export default function ExperienceTest4() {
   const scroll = useScroll();
   const { width, height } = useThree((state) => state.viewport);
   const { t } = useTranslation();
   const heroRef = useRef<Group>(null);

   useFrame(() => {
      // Faster scroll speed for test4
      if (heroRef.current) {
         heroRef.current.position.y = scroll.offset * 60;
      }
   });

   return (
      <>
         <ambientLight intensity={0.5} />
         <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
         <pointLight position={[-10, -10, -10]} intensity={1} />

         {/* Content Layer */}
         <group ref={heroRef} position={[0, 0, 0]}>
            {/* Simplified Diamond without FBO */}
            <DiamondSimple />

            <Image
               url="/vesslo-app-bg.png"
               position={[0, 0.5, -3]}
               scale={[width * 0.8, (width * 0.8) * 0.75]}
               transparent
               opacity={0.6}
            />

            <Html
               className="pointer-events-none"
               position={[-width / 2, -height / 2, 0]}
               style={{
                  color: "white",
                  fontSize: "1.6rem",
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontWeight: "bold",
                  padding: "1.5rem",
                  transform: "translate3d(0, -100%, 0)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.2rem"
               }}
            >
               <Link href="/vesslo" className="pointer-events-auto transition-transform hover:scale-105 active:scale-95 shrink-0 block">
                  <img src="/vesslo_icon.png" alt="Vesslo" style={{ width: "100px", height: "100px", borderRadius: "20px", flexShrink: 0, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", display: "block" }} />
               </Link>
               <div style={{ lineHeight: "1.2", display: "flex", flexDirection: "column", justifyContent: "center", whiteSpace: "nowrap" }}>
                  <div>{t("subtitle_line_1")}</div>
                  <div>{t("subtitle_line_2")}</div>
                  <Link href="/vesslo" className="pointer-events-auto">
                     <div style={{ fontSize: "1rem", marginTop: "0.5rem", opacity: 0.8, textDecoration: "underline", cursor: "pointer" }} className="hover:text-blue-400 transition-colors">
                        {t("learn_more")}
                     </div>
                  </Link>
               </div>
            </Html>
         </group>
      </>
   );
}
