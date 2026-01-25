import CoverFlow from "@/components/canvas/CoverFlow";

export default function TestPage() {
   return (
      <main className="w-full h-screen bg-black overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full p-4 z-10">
            <h1 className="text-white text-xl font-bold opacity-50">Vesslo Cover Flow Prototype</h1>
            <p className="text-white/30 text-sm">Testing new hero interaction</p>
         </div>
         <CoverFlow />
      </main>
   );
}
