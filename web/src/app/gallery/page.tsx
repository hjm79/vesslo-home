"use client";

import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/canvas/CircularGallery"), { ssr: false });

export default function TestPage3() {
   return (
      <main className="h-screen w-full bg-black">
         <style jsx global>{`
        body {
          cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMCIgZmlsbD0iI0U4QjA1OSIvPjwvc3ZnPg=='), auto;
        }
      `}</style>
         <CircularGallery />
      </main>
   );
}
