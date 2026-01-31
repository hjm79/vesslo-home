"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VessloText3D from "@/components/canvas/VessloText3D"; // R3F Component
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n"; // Ensure i18n is initialized

export default function VessloPage() {
   const { t } = useTranslation();
   const [selectedMedia, setSelectedMedia] = useState<string | null>(null); // Replaced selectedImage with selectedMedia
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   // Prevent hydration mismatch by rendering only after mount
   if (!mounted) return null;

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
         image: "/vesslo/vesslo_03.png",
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
         <Navbar />

         {/* Hero Section with R3F */}
         <section className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-start pt-24">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* 3D Canvas */}
            <div className="w-full h-[60vh] relative z-10 pointer-events-none">
               <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                  <VessloText3D />
               </Canvas>
            </div>

            {/* Hero Text */}
            <div className="relative z-20 text-center -mt-10 px-4">
               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6"
               >
                  {t('vesslo_page.hero.title')}
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto whitespace-pre-line"
               >
                  {t('vesslo_page.hero.desc')}
               </motion.p>

               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-10"
               >
                  <button className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform">
                     {t('vesslo_page.hero.download')}
                  </button>
                  <p className="mt-4 text-xs text-slate-500">{t('vesslo_page.hero.requirements')}</p>
               </motion.div>
            </div>
         </section>

         {/* Features Section */}
         <section className="py-32 px-6 container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-24 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" suppressHydrationWarning>
               {t('why_love')}
            </h2>

            <div className="space-y-32">
               {features.map((feature: any, index) => (
                  <motion.div
                     key={feature.id}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
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
         </section>

         {/* Screenshots Gallery Section (NEW) */}
         <section className="bg-slate-950/50 py-24 relative overflow-hidden">
            {/* Background enhancement */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" suppressHydrationWarning>
                  {t('app_screenshots')}
               </h2>

               {/* Horizontal Scroll Container */}
               <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <div className="flex gap-8 min-w-max px-4">
                     {[
                        "/vesslo-preview.png",
                        "/vesslo/vesslo_01.png",
                        "/vesslo/vesslo_02.png",
                        "/vesslo/vesslo_03.png",
                        "/vesslo/vesslo_04.png"
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
         <section className="py-24 bg-gradient-to-b from-slate-900 to-black text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/vesslo_icon.png')] bg-center bg-no-repeat opacity-5 blur-3xl scale-150 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('vesslo_page.cta.title')}</h2>
               <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto whitespace-pre-line">
                  {t('vesslo_page.cta.desc')}
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                     {t('vesslo_page.cta.button_download')}
                  </button>
                  <button className="px-10 py-4 border border-slate-700 text-white rounded-full font-medium text-xl hover:bg-slate-800 transition-colors">
                     {t('vesslo_page.cta.button_docs')}
                  </button>
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

         <Footer />
      </div>
   );
}
