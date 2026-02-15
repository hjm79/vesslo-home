"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n"; // Ensure i18n is initialized
import FloatingParticles from "@/components/ui/FloatingParticles";

// Sources to scan through (order: top to bottom)
const SOURCES = [
   { name: "homebrew", label: "Homebrew" },
   { name: "sparkle", label: "Sparkle" },
   { name: "appstore", label: "App Store" },
];

// Scan Animation Component
function ScanAnimation() {
   const [activeIndex, setActiveIndex] = useState(-1);
   const [scanComplete, setScanComplete] = useState(false);

   useEffect(() => {
      let isCancelled = false;

      const sequence = async () => {
         while (!isCancelled) {
            setActiveIndex(-1);
            setScanComplete(false);
            await new Promise(r => setTimeout(r, 500));
            if (isCancelled) return;

            for (let i = 0; i < SOURCES.length; i++) {
               if (isCancelled) return;
               setActiveIndex(i);
               await new Promise(r => setTimeout(r, 1200));
            }

            if (isCancelled) return;
            setScanComplete(true);
            await new Promise(r => setTimeout(r, 3000));
         }
      };

      sequence();

      return () => {
         isCancelled = true;
      };
   }, []);

   const getMagnifierPosition = () => {
      if (activeIndex === -1) return 0;
      if (scanComplete) return 100;
      return (activeIndex + 1) * 25;
   };

   return (
      <div className="flex justify-center">
         <div className="relative h-[380px] w-80">
            {/* Vertical Line */}
            <div
               className="absolute left-1/2 top-4 w-0.5 bg-gradient-to-b from-white/60 to-white/20 -translate-x-1/2 transition-all duration-700 ease-out"
               style={{ height: `${Math.min(getMagnifierPosition() * 0.72 + 2, 75)}%` }}
            />

            {/* Magnifying Glass */}
            <div
               className="absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-out z-30"
               style={{ top: scanComplete ? 'calc(100% - 7rem)' : `${getMagnifierPosition() * 0.72}%` }}
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
               const isLeft = index % 2 === 1;
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
                     {isScanned && <span className="ml-2 text-green-400">✓</span>}
                  </div>
               );
            })}

            {/* Vesslo App Icon */}
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

            {/* Connection line to Raycast */}
            {scanComplete && (
               <>
                  <div className="absolute bottom-12 left-[calc(50%+4.5rem)] flex items-center gap-1 opacity-0 animate-fadeIn">
                     <div className="w-16 h-0.5 bg-white/40" />
                     <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                     </svg>
                  </div>
                  <div className="absolute bottom-4 left-[calc(50%+10rem)] opacity-0 animate-fadeIn">
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
   );
}


export default function VessloPage() {
   const { t, i18n } = useTranslation();
   const [selectedMedia, setSelectedMedia] = useState<string | null>(null); // Replaced selectedImage with selectedMedia
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   // Prevent hydration mismatch by rendering only after mount
   if (!mounted) {
      return (
         <div className="min-h-screen bg-black text-white">
            <div className="pt-32 pb-16 text-center">
               <h1 className="text-5xl font-bold mb-4">Vesslo</h1>
               <p className="text-slate-400">The Ultimate Update Manager for macOS</p>
            </div>
         </div>
      );
   }

   const features = [
      {
         id: 1,
         title: t('vesslo_page.features.Design.title'),
         subtitle: t('vesslo_page.features.Design.subtitle'),
         desc: t('vesslo_page.features.Design.desc'),
         image: "/vesslo/vesslo_01.png",
         direction: "left"
      },
      {
         id: 2,
         title: t('vesslo_page.features.Unified.title'),
         subtitle: t('vesslo_page.features.Unified.subtitle'),
         desc: t('vesslo_page.features.Unified.desc'),
         image: "/vesslo/vesslo_02.png",
         direction: "right"
      },
      {
         id: 3,
         title: t('vesslo_page.features.Memory.title'),
         subtitle: t('vesslo_page.features.Memory.subtitle'),
         desc: t('vesslo_page.features.Memory.desc'),
         image: "/vesslo/vesslo_03.jpeg",
         direction: "left"
      },
      {
         id: 4,
         title: t('vesslo_page.features.Convertible.title'),
         subtitle: t('vesslo_page.features.Convertible.subtitle'),
         desc: t('vesslo_page.features.Convertible.desc'),
         image: "/vesslo/vesslo_04.png",
         direction: "right"
      },
      {
         id: 5,
         title: t('vesslo_page.features.Raycast.title'),
         subtitle: t('vesslo_page.features.Raycast.subtitle'),
         desc: t('vesslo_page.features.Raycast.desc'),
         video: "/vesslo/vesslo_05.mp4", // Changed to video
         direction: "center"
      }
   ];

   const isVideo = (url: string) => url.endsWith(".mp4") || url.endsWith(".webm");

   return (
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">

         {/* VideoObject JSON-LD for SEO */}
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "VideoObject",
                  "name": "Vesslo — Mac App Manager Overview",
                  "description": "Vesslo manages all your Mac apps in one place. Update Homebrew, Sparkle, and App Store apps with a single click.",
                  "thumbnailUrl": "https://vesslo.top/vesslo-preview.png",
                  "uploadDate": "2026-01-31",
                  "contentUrl": "https://vesslo.top/vesslo/vesslo_05.mp4",
                  "embedUrl": "https://vesslo.top/vesslo",
                  "publisher": {
                     "@type": "Organization",
                     "name": "Vesslo",
                     "logo": {
                        "@type": "ImageObject",
                        "url": "https://vesslo.top/vesslo_icon.png"
                     }
                  }
               })
            }}
         />

         {/* Hero Section - Scan Animation */}
         <section className="w-full relative overflow-hidden flex items-center justify-center py-20">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* Floating Particles */}
            <FloatingParticles count={35} />

            <div className="container mx-auto px-6 relative z-10">
               <div className="grid md:grid-cols-2 gap-16 items-center">

                  {/* Left: Scan Animation */}
                  <ScanAnimation />

                  {/* Right: Text Content */}
                  <div className="text-center md:text-left space-y-6">
                     {/* Badge */}
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30"
                     >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-medium text-cyan-300" suppressHydrationWarning>{t('scan.badge')}</span>
                     </motion.div>

                     {/* Headline */}
                     <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold leading-tight"
                        suppressHydrationWarning
                     >
                        {t('scan.headline_1')}
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                           {t('scan.headline_2')}
                        </span>
                     </motion.h1>

                     {/* Feature Cards */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-3"
                     >
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

                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-orange-500/20">
                           <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                 src="/raycast.png"
                                 alt="Raycast"
                                 width={32}
                                 height={32}
                                 className="object-cover"
                              />
                           </div>
                           <div>
                              <p className="font-medium text-white" suppressHydrationWarning>{t('scan.feature3_title')}</p>
                              <p className="text-sm text-slate-400" suppressHydrationWarning>{t('scan.feature3_desc')}</p>
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
            {/* Background Gradient - matching Hero section */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="container mx-auto relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold text-center mb-24 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" suppressHydrationWarning>
                  {t('why_love')}
               </h2>

               <div className="space-y-32">
                  {features.map((feature: any, index) => (
                     <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className={`flex flex-col ${feature.direction === 'right' ? 'md:flex-row-reverse' : feature.direction === 'center' ? 'flex-col items-center text-center' : 'md:flex-row'} items-center gap-12 md:gap-24`}
                     >
                        {/* Text Content */}
                        <div className={`flex-1 ${feature.direction === 'center' ? 'max-w-3xl' : ''}`}>
                           <div className="flex items-center gap-4 mb-4">
                              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-blue-400 border border-slate-700">
                                 0{index + 1}
                              </span>
                              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{feature.subtitle}</span>
                           </div>
                           <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                              {feature.title}
                           </h3>
                           <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-line">
                              {feature.desc}
                           </p>
                        </div>

                        {/* Media Content */}
                        <div className={`flex-1 w-full ${feature.direction === 'center' ? 'max-w-4xl mt-12' : ''}`}>
                           <div
                              className="relative group rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-sm cursor-zoom-in"
                              onClick={() => setSelectedMedia(feature.video || feature.image)}
                           >
                              {/* Decorative Glow */}
                              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                              {/* Adjusted to 4:3 (640x480) Ratio as requested */}
                              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-800">

                                 {feature.video ? (
                                    <video
                                       src={feature.video}
                                       autoPlay
                                       loop
                                       muted
                                       playsInline
                                       className="w-full h-full object-contain bg-black"
                                    />
                                 ) : (
                                    <img
                                       src={feature.image}
                                       alt={feature.title}
                                       className={`w-full h-full object-cover transition-transform duration-700 ${feature.direction === 'center' ? 'object-center' : 'group-hover:scale-105'}`}
                                       onError={(e) => {
                                          (e.target as HTMLImageElement).src = '/vesslo-preview.png';
                                          (e.target as HTMLImageElement).style.opacity = '0.5';
                                       }}
                                    />
                                 )}

                                 {/* Zoom Hint Icon */}
                                 <div className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                                    {feature.video ? (
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                       </svg>
                                    ) : (
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                       </svg>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Screenshots Gallery Section (NEW) */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
            {/* Background enhancement */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" suppressHydrationWarning>
                  {t('app_screenshots')}
               </h2>

               {/* Horizontal Scroll Container */}
               <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <div className="flex gap-8 min-w-max px-4">
                     {[
                        "/circle/vesslo_circle-001.png",
                        "/circle/vesslo_circle-002.png",
                        "/circle/vesslo_circle-003.png",
                        "/circle/vesslo_circle-004.png",
                        "/circle/vesslo_circle-005.png",
                        "/circle/vesslo_circle-006.png",
                        "/circle/vesslo_circle-007.png",
                        "/circle/vesslo_circle-008.png"
                     ].map((shot, i) => (
                        <div
                           key={i}
                           className="flex-shrink-0 w-[600px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer bg-slate-900/50 backdrop-blur-sm"
                           onClick={() => setSelectedMedia(shot)}
                        >
                           <img
                              src={shot}
                              alt={`Vesslo Screenshot ${i + 1}`}
                              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <p className="text-center text-slate-500 text-sm mt-8 flex items-center justify-center gap-2" suppressHydrationWarning>
                  <span className="animate-pulse">←</span> {t('scroll_more')} <span className="animate-pulse">→</span>
               </p>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('vesslo_page.cta.title')}</h2>
               <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto whitespace-pre-line">
                  {t('vesslo_page.cta.desc')}
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                     href="https://hjm79.paddle.com/paddlejs/overlay-checkout?product=79888"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-10 py-4 bg-white text-black rounded-full font-bold text-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10"
                  >
                     {i18n.language?.startsWith('ko') ? '구매하기' : 'Purchase'}
                  </a>
                  <a
                     href="/vesslo/docs"
                     className="px-10 py-4 border border-slate-700 text-white rounded-full font-medium text-xl hover:bg-slate-800 transition-colors"
                  >
                     {t('vesslo_page.cta.button_docs')}
                  </a>
               </div>
            </div>
         </section>

         {/* Fullscreen Media Modal */}
         <AnimatePresence>
            {selectedMedia && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 cursor-zoom-out backdrop-blur-sm"
                  onClick={() => setSelectedMedia(null)}
               >
                  {isVideo(selectedMedia) ? (
                     <motion.video
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        src={selectedMedia}
                        autoPlay loop controls playsInline
                        className="max-w-full max-h-[95vh] rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // Allow controls to work
                     />
                  ) : (
                     <motion.img
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        src={selectedMedia}
                        alt="Fullscreen view"
                        className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
                     />
                  )}

                  <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
