"use client";

import CSS3DCube from "./CSS3DCube";

interface GlassmorphismHeroProps {
   iconUrl: string;
   color: string;
}

export default function GlassmorphismHero({ iconUrl, color }: GlassmorphismHeroProps) {
   return (
      <section className="h-[55vh] md:h-[65vh] w-full relative bg-black overflow-hidden flex items-center justify-center">
         {/* Background Gradient Blob */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

         {/* Animated Glassmorphism Text */}
         <div className="relative z-10 text-center animate-float-slow">
            <h1
               className="text-8xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/30 drop-shadow-2xl select-none"
               style={{
                  textShadow: '0 0 80px rgba(168, 85, 247, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.1)',
               }}>
               Vesslo
            </h1>
            {/* Floating CSS 3D Cube below text */}
            <div className="w-24 h-24 mx-auto mt-4">
               <CSS3DCube iconUrl={iconUrl} color={color} size={80} />
            </div>
         </div>

         {/* Cinematic Vignette Overlay */}
         <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] w-full h-full mix-blend-multiply" />

         <style jsx>{`
            @keyframes float-slow {
               0%, 100% { transform: translateY(0px); }
               50% { transform: translateY(-10px); }
            }
            .animate-float-slow {
               animation: float-slow 4s ease-in-out infinite;
            }
         `}</style>
      </section>
   );
}
