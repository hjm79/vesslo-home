"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ConvergingParticles from "@/components/ui/ConvergingParticles";
import { ShieldIcon, BoltIcon, PaintBrushIcon, ChevronDownIcon, ArrowRightIcon } from "@/components/icons/Icons";

const APPS_STATIC = [
   {
      slug: "vesslo",
      title: "Vesslo",
      descKey: "apps.vesslo.description",
      icon: "/vesslo_icon.png",
      color: "#a855f7",
      preview: "/vesslo-preview.png"
   },
   {
      slug: "keyharbor",
      title: "KeyHarbor",
      descKey: "apps.keyharbor.description",
      icon: "/keyharbor-icon.png",
      color: "#3b82f6",
      preview: "/keyharbor-preview.png"
   },
   {
      slug: "splitswipe",
      title: "SplitSwipe",
      descKey: "apps.splitswipe.description",
      icon: "/splitswipe-icon.png",
      color: "#f97316",
      preview: "/splitswipe-preview.png"
   },
   {
      slug: "harbordrop",
      title: "HarborDrop",
      descKey: "apps.harbordrop.description",
      icon: "/harbordrop-icon.png",
      color: "#10b981",
      preview: "/harbordrop/harbordrop-inaction.jpeg"
   }
];

/* ─── Video Opening Overlay ─── */
function VideoOpening({ onComplete }: { onComplete: () => void }) {
   const videoRef = useRef<HTMLVideoElement>(null);
   const [fadeOut, setFadeOut] = useState(false);
   const [progress, setProgress] = useState(0);
   const completedRef = useRef(false);

   const handleEnd = useCallback(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      setFadeOut(true);
      setTimeout(onComplete, 900);
   }, [onComplete]);

   const handleSkip = useCallback(() => {
      if (videoRef.current) videoRef.current.pause();
      handleEnd();
   }, [handleEnd]);

   // Video error fallback — skip to content immediately
   const handleError = useCallback(() => {
      onComplete();
   }, [onComplete]);

   useEffect(() => {
      const v = videoRef.current;
      if (!v) return;

      // Timeout fallback: if video hasn't started playing within 3s, skip
      const timeout = setTimeout(() => {
         if (v.readyState < 2) handleEnd();
      }, 3000);

      const onTime = () => {
         if (v.duration) setProgress(v.currentTime / v.duration);
      };
      v.addEventListener("timeupdate", onTime);
      return () => {
         clearTimeout(timeout);
         v.removeEventListener("timeupdate", onTime);
      };
   }, [handleEnd]);

   return (
      <motion.div
         className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
         initial={{ opacity: 1 }}
         animate={{ opacity: fadeOut ? 0 : 1 }}
         transition={{ duration: 0.8, ease: "easeInOut" }}
      >
         {/* Video — fullscreen background, scales proportionally */}
         <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={handleEnd}
            className="absolute inset-0 w-full h-full object-contain"
            onError={handleError}
         >
            <source src="/opening2.mp4" type="video/mp4" />
         </video>

         {/* Subtle vignette */}
         <div className="absolute inset-0 pointer-events-none"
            style={{
               background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)"
            }}
         />

         {/* Icons + text overlaid on video */}
         <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
         >
            <div className="flex items-center gap-4 md:gap-5">
               {APPS_STATIC.map((app, i) => (
                  <motion.div
                     key={app.slug}
                     className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.0 + i * 0.2, duration: 0.6, ease: "easeOut" }}
                     style={{ boxShadow: `0 0 50px ${app.color}50` }}
                  >
                     <Image src={app.icon} alt={app.title} width={80} height={80} className="w-full h-full object-contain" />
                  </motion.div>
               ))}
            </div>
            <motion.p
               className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mt-2"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2.0, duration: 1 }}
            >
               The Ultimate Mac Ecosystem
            </motion.p>
         </motion.div>

         {/* Progress bar + skip */}
         <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-3">
            <div className="w-32 md:w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
               <motion.div
                  className="h-full bg-white/60 rounded-full"
                  style={{ width: `${progress * 100}%` }}
               />
            </div>
            <motion.button
               onClick={handleSkip}
               className="text-white/40 hover:text-white/80 text-xs tracking-widest uppercase transition-colors"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.5 }}
            >
               Skip
            </motion.button>
         </div>
      </motion.div>
   );
}

/* ─── Main Page ─── */
export default function Home() {
   const { t } = useTranslation();
   const router = useRouter();
   const [mounted, setMounted] = useState(false);

   // Check if returning visitor — skip opening if already seen
   const hasSeenOpening = typeof window !== "undefined" && localStorage.getItem("seen_opening") === "1";
   const [showOpening, setShowOpening] = useState(!hasSeenOpening);
   const [contentReady, setContentReady] = useState(hasSeenOpening);

   useEffect(() => {
      setMounted(true);
   }, []);

   const handleOpeningComplete = useCallback(() => {
      setShowOpening(false);
      // Mark as seen for future visits
      try { localStorage.setItem("seen_opening", "1"); } catch { }
      setTimeout(() => setContentReady(true), 100);
   }, []);

   // SEO: English content for Google crawler
   if (!mounted) {
      return (
         <div className="min-h-screen bg-black text-white">
            <nav className="py-4 px-6 flex gap-6 text-sm text-white/70">
               <a href="/">Home</a>
               <a href="/vesslo">Vesslo</a>
               <a href="/keyharbor">KeyHarbor</a>
               <a href="/splitswipe">SplitSwipe</a>
               <a href="/pricing">Pricing</a>
               <a href="/gallery">Gallery</a>
            </nav>
            <div className="h-[85vh] flex flex-col items-center justify-center text-center px-6">
               <h1 className="text-5xl md:text-7xl font-bold mb-6">The Ultimate Mac Ecosystem</h1>
               <p className="text-xl text-slate-400 mb-8">Discover three powerful tools: Vesslo, KeyHarbor, and SplitSwipe. The ultimate update manager for macOS. App Store, Homebrew and more in one unified tracker.</p>
            </div>
         </div>
      );
   }

   return (
      <>
         {/* Video Opening Overlay */}
         <AnimatePresence>
            {showOpening && (
               <VideoOpening onComplete={handleOpeningComplete} />
            )}
         </AnimatePresence>

         {/* Main Content */}
         <motion.div
            className="min-h-screen bg-black text-white overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: contentReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
         >

            {/* ============ HERO SECTION ============ */}
            <section className="h-[85vh] flex flex-col items-center justify-center relative px-6">
               {/* Background Gradient */}
               <div className="absolute inset-0 bg-black pointer-events-none" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

               {/* Converging Particles */}
               <ConvergingParticles count={15} />

               {/* Content */}
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={contentReady ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-10 text-center max-w-4xl"
               >
                  {/* App Icons Row */}
                  <div className="flex justify-center gap-6 mb-12">
                     {APPS_STATIC.map((app, i) => (
                        <motion.div
                           key={app.slug}
                           className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-2xl cursor-pointer overflow-hidden relative"
                           initial={{ opacity: 0, scale: 0.5, y: 20 }}
                           animate={contentReady ? {
                              opacity: 1,
                              scale: 1,
                              y: [0, -8, 0]
                           } : {}}
                           transition={{
                              opacity: { delay: 0.3 + i * 0.1, duration: 0.5 },
                              scale: { delay: 0.3 + i * 0.1, duration: 0.5 },
                              y: { delay: 0.6 + i * 0.15, duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }
                           }}
                           whileHover={{ scale: 1.15, y: -5 }}
                           style={{ boxShadow: `0 0 40px ${app.color}40` }}
                           onClick={() => router.push(`/${app.slug}`)}
                        >
                           <Image
                              src={app.icon}
                              alt={app.title}
                              fill
                              className="object-contain"
                              sizes="80px"
                           />
                        </motion.div>
                     ))}
                  </div>

                  {/* Headline */}
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60" suppressHydrationWarning>
                     {t('subtitle_line_1')}
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto" suppressHydrationWarning>
                     {t('subtitle_line_2')}
                  </p>

                  {/* CTA */}
                  <a href="#apps" className="inline-block px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-white/20" suppressHydrationWarning>
                     {t('homepage.browse_apps')}
                  </a>
               </motion.div>

               {/* Scroll Indicator */}
               <div className="absolute bottom-10 animate-bounce text-white/40">
                  <ChevronDownIcon />
               </div>
            </section>

            {/* ============ APP SHOWCASE SECTION ============ */}
            <section id="apps" className="py-32 px-6 bg-gradient-to-b from-black to-slate-950">
               <div className="container mx-auto max-w-6xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" suppressHydrationWarning>
                     {t('homepage.our_apps')}
                  </h2>
                  <p className="text-slate-400 text-center mb-20 text-lg max-w-2xl mx-auto" suppressHydrationWarning>
                     {t('homepage.our_apps_desc')}
                  </p>

                  <div className="grid md:grid-cols-3 gap-8">
                     {APPS_STATIC.map((app, index) => (
                        <motion.div
                           key={app.slug}
                           initial={{ opacity: 0, y: 50 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: false }}
                           transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                           <Link href={`/${app.slug}`}>
                              <div
                                 className="group relative bg-slate-900/50 rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                                 style={{
                                    boxShadow: `0 0 0 1px ${app.color}00, 0 20px 50px -20px ${app.color}30`
                                 }}
                              >
                                 {/* Glow on hover */}
                                 <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at center, ${app.color}15 0%, transparent 70%)` }}
                                 />

                                 {/* Preview Image */}
                                 <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                       src={app.preview}
                                       alt={`${app.title} Preview`}
                                       loading="lazy"
                                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                       onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                       }}
                                    />
                                 </div>

                                 {/* Content */}
                                 <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                       <img
                                          src={app.icon}
                                          alt={app.title}
                                          loading="lazy"
                                          className="w-12 h-12 rounded-xl"
                                       />
                                       <h3
                                          className="text-2xl font-bold"
                                          style={{ color: app.color }}
                                       >
                                          {app.title}
                                       </h3>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed mb-6" suppressHydrationWarning>
                                       {t(app.descKey)}
                                    </p>
                                    <div
                                       className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                                       style={{ color: app.color }}
                                       suppressHydrationWarning
                                    >
                                       {t('homepage.view_more')}
                                       <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                 </div>
                              </div>
                           </Link>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ============ FEATURES/TRUST SECTION ============ */}
            <section className="py-24 px-6 bg-slate-950 border-t border-white/5">
               <div className="container mx-auto max-w-4xl text-center">
                  <motion.h2
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: false }}
                     transition={{ duration: 0.6 }}
                     className="text-3xl md:text-4xl font-bold mb-16"
                     suppressHydrationWarning
                  >
                     {t('homepage.philosophy')}
                  </motion.h2>

                  <div className="grid md:grid-cols-3 gap-12">
                     <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0 }}
                     >
                        <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                           <ShieldIcon />
                        </div>
                        <h3 className="text-xl font-bold mb-3" suppressHydrationWarning>{t('homepage.strong_security')}</h3>
                        <p className="text-slate-400" suppressHydrationWarning>{t('homepage.strong_security_desc')}</p>
                     </motion.div>

                     <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                     >
                        <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                           <BoltIcon />
                        </div>
                        <h3 className="text-xl font-bold mb-3" suppressHydrationWarning>{t('homepage.native_speed')}</h3>
                        <p className="text-slate-400" suppressHydrationWarning>{t('homepage.native_speed_desc')}</p>
                     </motion.div>

                     <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                     >
                        <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                           <PaintBrushIcon />
                        </div>
                        <h3 className="text-xl font-bold mb-3" suppressHydrationWarning>{t('homepage.beautiful_design')}</h3>
                        <p className="text-slate-400" suppressHydrationWarning>{t('homepage.beautiful_design_desc')}</p>
                     </motion.div>
                  </div>
               </div>
            </section>

            {/* ============ FINAL CTA SECTION ============ */}
            <section className="py-32 px-6 bg-black relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

               <div className="container mx-auto max-w-3xl text-center relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6" suppressHydrationWarning>
                     {t('homepage.get_started')}
                  </h2>
                  <p className="text-xl text-slate-400 mb-12" suppressHydrationWarning>
                     {t('homepage.free_trial_desc')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <a href="#apps" className="inline-block px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg" suppressHydrationWarning>
                        {t('homepage.browse_apps')}
                     </a>
                     <a href="mailto:me@hjm79.top" className="inline-block px-10 py-4 border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-colors" suppressHydrationWarning>
                        {t('homepage.contact_us')}
                     </a>
                  </div>
               </div>
            </section>
         </motion.div>
      </>
   );
}
