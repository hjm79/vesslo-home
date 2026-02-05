"use client";

import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/canvas/CircularGallery"), {
   ssr: false,
   loading: () => (
      <div className="h-screen w-full bg-black flex items-center justify-center">
         <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Vesslo Gallery</h1>
            <p className="text-slate-400">Interactive 3D showcase of Vesslo ecosystem apps</p>
            <p className="text-slate-500 mt-4">Loading experience...</p>
         </div>
      </div>
   )
});

export default function GalleryPage() {
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
