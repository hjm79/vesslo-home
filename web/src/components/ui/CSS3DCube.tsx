"use client";

import { useEffect, useRef } from "react";

interface CSS3DCubeProps {
   iconUrl: string;
   color?: string;
   size?: number;
}

export default function CSS3DCube({ iconUrl, size = 200 }: CSS3DCubeProps) {
   const cubeRef = useRef<HTMLDivElement>(null);
   const rotationRef = useRef({ x: 0, y: 0 });

   useEffect(() => {
      let animationId: number;
      const animate = () => {
         rotationRef.current.y += 0.5;
         rotationRef.current.x = Math.sin(Date.now() * 0.001) * 10;

         if (cubeRef.current) {
            cubeRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
         }
         animationId = requestAnimationFrame(animate);
      };

      animate();
      return () => cancelAnimationFrame(animationId);
   }, []);

   const faceStyle = {
      position: 'absolute' as const,
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url(${iconUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backfaceVisibility: 'hidden' as const,
      border: '1px solid rgba(255,255,255,0.1)',
   };

   const half = size / 2;

   return (
      <div
         className="relative w-full h-full flex items-center justify-center"
         style={{ perspective: '1000px' }}
      >
         {/* Float animation wrapper */}
         <div className="animate-float">
            <div
               ref={cubeRef}
               style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.05s linear',
               }}
            >
               {/* Front */}
               <div style={{ ...faceStyle, transform: `translateZ(${half}px)` }} />
               {/* Back */}
               <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)` }} />
               {/* Right */}
               <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }} />
               {/* Left */}
               <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
               {/* Top */}
               <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)` }} />
               {/* Bottom */}
               <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
            </div>
         </div>

         <style jsx>{`
            @keyframes float {
               0%, 100% { transform: translateY(0px); }
               50% { transform: translateY(-15px); }
            }
            .animate-float {
               animation: float 3s ease-in-out infinite;
            }
         `}</style>
      </div>
   );
}
