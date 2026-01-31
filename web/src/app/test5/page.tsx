"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "@/i18n";

// Sources to scan through (order: top to bottom)
const SOURCES = [
   { name: "homebrew", label: "Homebrew" },
   { name: "sparkle", label: "Sparkle" },
   { name: "appstore", label: "App Store" },
];

export default function Test5Page() {
   const [activeIndex, setActiveIndex] = useState(-1); // -1 = starting, 0-2 = scanning sources
   const [scanComplete, setScanComplete] = useState(false);
   const { t } = useTranslation();

   // Scanning animation sequence
   useEffect(() => {
      const sequence = async () => {
         // Reset
         setActiveIndex(-1);
         setScanComplete(false);

         // Wait a moment before starting
         await new Promise(r => setTimeout(r, 500));

         // Scan through each source
         for (let i = 0; i < SOURCES.length; i++) {
            setActiveIndex(i);
            await new Promise(r => setTimeout(r, 1200));
         }

         // Complete
         setScanComplete(true);

         // Wait and restart
         await new Promise(r => setTimeout(r, 3000));
         sequence();
      };

      sequence();
   }, []);

   // Calculate magnifier position based on active index
   // Positions: 0=top, 25%=homebrew, 50%=sparkle, 75%=appstore, 100%=icon
   const getMagnifierPosition = () => {
      if (activeIndex === -1) return 0; // Top
      if (scanComplete) return 100; // Bottom (at icon)
      // Position for each source: (index + 1) * 25%
      return (activeIndex + 1) * 25;
   };

   return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
         <div className="container mx-auto px-6 py-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">

               {/* Left: Vertical Scan Animation */}
               <div className="flex justify-center">
                  <div className="relative h-[380px] w-80">

                     {/* Vertical Line - grows as magnifier moves down */}
                     <div
                        className="absolute left-1/2 top-4 w-0.5 bg-gradient-to-b from-white/60 to-white/20 -translate-x-1/2 transition-all duration-700 ease-out"
                        style={{ height: `${Math.min(getMagnifierPosition() * 0.72 + 2, 75)}%` }}
                     />

                     {/* Magnifying Glass - moves down, stops in front of Vesslo icon */}
                     <div
                        className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-out z-30`}
                        style={{ top: scanComplete ? 'calc(100% - 10rem)' : `${getMagnifierPosition() * 0.72}%` }}
                     >
                        <svg
                           className={`w-12 h-12 text-white drop-shadow-lg transition-all duration-500 ${scanComplete ? 'text-blue-400 scale-110' : ''}`}
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="1.5"
                        >
                           <circle cx="11" cy="11" r="8" />
                           <path d="M21 21l-4.35-4.35" />
                        </svg>
                     </div>

                     {/* Source Badges */}
                     {SOURCES.map((source, index) => {
                        const isActive = activeIndex === index;
                        const isScanned = activeIndex > index || scanComplete;
                        // Alternate left/right positioning
                        const isLeft = index % 2 === 1;
                        // Position each badge vertically (closer together)
                        const topPosition = (index + 1) * 12 + 5;

                        return (
                           <div
                              key={source.name}
                              className={`
                                 absolute
                                 ${isLeft ? 'right-[55%] mr-6' : 'left-[55%] ml-6'}
                                 px-4 py-1.5 rounded-full
                                 text-sm font-medium
                                 border backdrop-blur-sm
                                 transition-all duration-500 ease-out
                                 ${isActive
                                    ? "bg-cyan-600 border-cyan-400 text-white scale-110 shadow-lg shadow-cyan-500/40"
                                    : isScanned
                                       ? "bg-teal-600/60 border-teal-500/60 text-white/90"
                                       : "bg-slate-800/60 border-slate-600/40 text-white/50"
                                 }
                              `}
                              style={{ top: `${topPosition}%` }}
                           >
                              {source.label}
                              {isScanned && (
                                 <span className="ml-2 text-green-400">✓</span>
                              )}
                           </div>
                        );
                     })}

                     {/* Vesslo App Icon at bottom */}
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0">
                        <div className={`
                           relative w-32 h-32 rounded-[1.5rem] overflow-hidden 
                           shadow-2xl transition-all duration-500
                           ${scanComplete ? "shadow-blue-500/50 scale-105" : "shadow-blue-500/20"}
                        `}>
                           <Image
                              src="/vesslo_icon.png"
                              alt="Vesslo"
                              fill
                              className="object-cover"
                           />
                        </div>
                     </div>

                     {/* Connection line to result (when scan complete) */}
                     {scanComplete && (
                        <>
                           {/* Horizontal arrow line from Vesslo icon */}
                           <div className="absolute bottom-[-2rem] left-[calc(50%+4.5rem)] flex items-center gap-1 opacity-0 animate-fadeIn">
                              {/* Dashed line */}
                              <div className="w-16 h-0.5 border-t-2 border-dashed border-white/40" />
                              {/* Arrow head */}
                              <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                           </div>

                           {/* Result app icon (Raycast) - positioned lower */}
                           <div className="absolute -bottom-12 left-[calc(50%+10rem)] opacity-0 animate-fadeIn">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-lg shadow-orange-500/30 border border-orange-500/40">
                                 <Image
                                    src="/raycast.png"
                                    alt="Raycast"
                                    fill
                                    className="object-cover"
                                 />
                              </div>
                              <p className="text-center text-xs text-orange-400 mt-2 font-medium">Raycast</p>
                           </div>
                        </>
                     )}
                  </div>
               </div>

               {/* Right: Text Content - Unique Vesslo Design */}
               <div className="text-center md:text-left space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30">
                     <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                     <span className="text-xs font-medium text-cyan-300" suppressHydrationWarning>{t('scan.badge')}</span>
                  </div>

                  {/* Headline */}
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight" suppressHydrationWarning>
                     {t('scan.headline_1')}
                     <br />
                     <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                        {t('scan.headline_2')}
                     </span>
                  </h2>

                  {/* Feature Cards */}
                  <div className="space-y-3">
                     <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                           <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                        </div>
                        <div>
                           <p className="font-medium text-white" suppressHydrationWarning>{t('scan.feature1_title')}</p>
                           <p className="text-sm text-slate-400" suppressHydrationWarning>{t('scan.feature1_desc')}</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                           <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                           </svg>
                        </div>
                        <div>
                           <p className="font-medium text-white" suppressHydrationWarning>{t('scan.feature2_title')}</p>
                           <p className="text-sm text-slate-400" suppressHydrationWarning>{t('scan.feature2_desc')}</p>
                        </div>
                     </div>

                     {/* Raycast Integration Feature */}
                     <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-orange-500/20">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                           <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                           </svg>
                        </div>
                        <div>
                           <p className="font-medium text-white" suppressHydrationWarning>{t('scan.feature3_title')}</p>
                           <p className="text-sm text-slate-400" suppressHydrationWarning>{t('scan.feature3_desc')}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
