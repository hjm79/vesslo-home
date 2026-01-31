"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function SplitSwipePage() {
   const { t } = useTranslation();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   const features = [
      {
         icon: "✨",
         titleKey: "splitswipe.feature1_title",
         descKey: "splitswipe.feature1_desc",
      },
      {
         icon: "🎯",
         titleKey: "splitswipe.feature2_title",
         descKey: "splitswipe.feature2_desc",
      },
      {
         icon: "⌨️",
         titleKey: "splitswipe.feature3_title",
         descKey: "splitswipe.feature3_desc",
      },
   ];

   return (
      <div className="min-h-screen bg-black text-white">
         <Navbar />

         {/* Hero Section */}
         <section className="min-h-screen w-full relative overflow-hidden flex items-center justify-center py-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/15 rounded-full blur-[150px] pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-10">
               <div className="grid md:grid-cols-2 gap-16 items-center">

                  {/* Left: App Icon */}
                  <div className="flex justify-center">
                     <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-64 h-64"
                     >
                        <Image
                           src="/splitswipe-icon.png"
                           alt="SplitSwipe"
                           fill
                           className="object-contain drop-shadow-2xl"
                        />
                     </motion.div>
                  </div>

                  {/* Right: Text Content */}
                  <div className="text-center md:text-left space-y-6">
                     <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold"
                        suppressHydrationWarning
                     >
                        SplitSwipe
                     </motion.h1>
                     <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400"
                        suppressHydrationWarning
                     >
                        {t('splitswipe.tagline', 'Window Management, Reimagined')}
                     </motion.p>

                     {/* Features */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 mt-8"
                     >
                        {features.map((feature, index) => (
                           <div
                              key={index}
                              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                           >
                              <span className="text-2xl">{feature.icon}</span>
                              <div>
                                 <p className="font-medium text-white" suppressHydrationWarning>
                                    {t(feature.titleKey, feature.titleKey.split('.')[1])}
                                 </p>
                                 <p className="text-sm text-slate-400" suppressHydrationWarning>
                                    {t(feature.descKey, '')}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </motion.div>

                     {/* Download Button */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-6"
                     >
                        <button className="px-8 py-3 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-colors">
                           {t('download_free', 'Download Free')}
                        </button>
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>

         {/* Video Section */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-3xl font-bold text-center mb-12" suppressHydrationWarning>
                  {t('in_action', 'In Action')}
               </h2>

               <div className="flex justify-center">
                  <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                     <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto"
                     >
                        <source src="/splitswipe/splitswipe_move.webm" type="video/webm" />
                        <source src="/splitswipe/splitswipe_move.mp4" type="video/mp4" />
                     </video>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
