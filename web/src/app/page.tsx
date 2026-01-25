"use client";

import dynamic from "next/dynamic";
import { ScrollControls, Scroll } from "@react-three/drei";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });
const Experience = dynamic(() => import("@/components/canvas/Experience"), { ssr: false });
const Interface = dynamic(() => import("@/components/ui/Interface"), { ssr: false });

export default function Home() {
  return (
    <main className="h-screen w-full bg-slate-50 dark:bg-slate-950">
      <Scene>
        <ScrollControls pages={5} damping={0.25}>
          <Experience />
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Scene>
    </main>
  );
}
