"use client";

import dynamic from "next/dynamic";

// Import the TEST interface
const InterfaceTest = dynamic(() => import("@/components/ui/InterfaceTest"), { ssr: false });

export default function TestPage2() {
   return (
      <main className="min-h-screen w-full bg-slate-50 dark:bg-black">
         <InterfaceTest />
      </main>
   );
}
