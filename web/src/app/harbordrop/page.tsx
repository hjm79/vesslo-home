"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";
import ConvergingParticles from "@/components/ui/ConvergingParticles";

const APP_CONFIG = {
   title: "HarborDrop",
   color: "#10b981",
   icon: "/harbordrop-icon.png",
   screenshots: [
      "/harbordrop/harbordrop-inaction.jpeg",
      "/harbordrop/harbordrop-UI.jpeg",
      "/harbordrop/harbordrop-categories.png",
      "/harbordrop/harbordrop-set-segments.png",
   ],
};

// Fake download files for the animation loop
const DOWNLOAD_FILES = [
   { name: "LoupedeckInstaller_5.9.1.19365.dmg", size: "284.7 MB", icon: "📦" },
   { name: "ffmpeg-7.1-macOS-arm64.zip", size: "52.3 MB", icon: "🗜️" },
   { name: "Docker-Desktop-4.38.0.dmg", size: "718.2 MB", icon: "🐳" },
];

// Segment Download Animation Component — mimics actual HarborDrop UI
function SegmentDownloadAnimation({ lang }: { lang: string }) {
   const [phase, setPhase] = useState<"downloading" | "merging" | "done">("downloading");
   const [segmentProgress, setSegmentProgress] = useState<number[]>([0, 0, 0, 0, 0, 0]);
   const [loopCount, setLoopCount] = useState(0);
   const [speed, setSpeed] = useState("0 KB/s");
   const [downloaded, setDownloaded] = useState("0 MB");
   const currentFile = DOWNLOAD_FILES[loopCount % DOWNLOAD_FILES.length];

   useEffect(() => {
      setPhase("downloading");
      setSegmentProgress([0, 0, 0, 0, 0, 0]);
      setSpeed("0 KB/s");
      setDownloaded("0 MB");

      // Each segment downloads at a different speed
      const speeds = [2.4, 1.9, 2.8, 1.6, 2.2, 2.0];
      const totalSizeMB = parseFloat(currentFile.size);

      const interval = setInterval(() => {
         setSegmentProgress((prev) => {
            const next = prev.map((p, i) => Math.min(p + speeds[i] + Math.random() * 0.5, 100));
            const avg = next.reduce((a, b) => a + b, 0) / 6;

            // Update display stats
            const dlMB = (totalSizeMB * avg / 100).toFixed(1);
            const speedMBs = (speeds.reduce((a, b) => a + b, 0) * totalSizeMB / 600 + Math.random() * 2).toFixed(1);
            setDownloaded(`${dlMB} MB`);
            setSpeed(`${speedMBs} MB/s`);

            if (next.every((p) => p >= 100)) {
               clearInterval(interval);
               setDownloaded(currentFile.size);
               setSpeed("0 KB/s");
               setTimeout(() => setPhase("merging"), 200);
               setTimeout(() => setPhase("done"), 1200);
               setTimeout(() => setLoopCount((c) => c + 1), 3500);
            }
            return next;
         });
      }, 60);

      return () => clearInterval(interval);
   }, [loopCount]);

   const avg = Math.round(segmentProgress.reduce((a, b) => a + b, 0) / 6);

   return (
      <div className="relative w-full flex items-center justify-center py-8">
         <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
            {/* Download Card — mimics actual HarborDrop row */}
            <div className="rounded-xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm">

               {/* File Info Header */}
               <div className="px-5 pt-4 pb-3 flex items-center gap-3">
                  <span className="text-2xl">{currentFile.icon}</span>
                  <div className="flex-1 min-w-0">
                     <p className="text-white font-medium text-sm truncate">{currentFile.name}</p>
                     <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-slate-500">{currentFile.size}</span>
                        <span className="text-xs text-slate-600">·</span>
                        <span className="text-xs text-emerald-400/80 font-mono">{speed}</span>
                        <span className="text-xs text-slate-600">·</span>
                        <span className="text-xs text-slate-400 font-mono">{downloaded} / {currentFile.size}</span>
                     </div>
                  </div>
                  {/* Status indicator */}
                  <AnimatePresence mode="wait">
                     {phase === "done" ? (
                        <motion.div
                           key="done"
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"
                        >
                           <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                           </svg>
                        </motion.div>
                     ) : (
                        <motion.span
                           key="pct"
                           className="text-sm font-bold text-emerald-400 flex-shrink-0 font-mono w-10 text-right"
                        >
                           {avg}%
                        </motion.span>
                     )}
                  </AnimatePresence>
               </div>

               {/* Segmented Progress Bar — 6 segments in a row */}
               <div className="px-5 pb-4">
                  <div className="flex gap-[3px]">
                     {segmentProgress.map((progress, i) => (
                        <div key={i} className="flex-1 h-[6px] bg-white/10 rounded-sm overflow-hidden">
                           <motion.div
                              className="h-full rounded-sm"
                              style={{
                                 width: `${progress}%`,
                                 backgroundColor: phase === "done" ? "#10b981" : "#3b82f6",
                              }}
                              animate={{
                                 backgroundColor: phase === "done" ? "#10b981" : "#3b82f6",
                              }}
                              transition={{ duration: 0.3 }}
                           />
                        </div>
                     ))}
                  </div>

                  {/* Merging indicator */}
                  <AnimatePresence>
                     {phase === "merging" && (
                        <motion.p
                           className="text-xs text-center text-emerald-400/70 mt-2 font-mono"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                        >
                           {lang === "ko" ? "세그먼트 병합 중..." : "Merging segments..."}
                        </motion.p>
                     )}
                  </AnimatePresence>
               </div>
            </div>

            {/* Second queued file preview (dimmed) */}
            <motion.div
               className="mt-2 rounded-xl bg-slate-900/40 border border-white/5 px-5 py-3 flex items-center gap-3"
               animate={{ opacity: phase === "done" ? 0.9 : 0.4 }}
            >
               <span className="text-lg">{DOWNLOAD_FILES[(loopCount + 1) % DOWNLOAD_FILES.length].icon}</span>
               <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-xs truncate">
                     {DOWNLOAD_FILES[(loopCount + 1) % DOWNLOAD_FILES.length].name}
                  </p>
                  <p className="text-slate-600 text-[10px]">
                     {lang === "ko" ? "대기 중" : "Queued"} · {DOWNLOAD_FILES[(loopCount + 1) % DOWNLOAD_FILES.length].size}
                  </p>
               </div>
            </motion.div>

            {/* Third queued file preview (even dimmer) */}
            <motion.div
               className="mt-1.5 rounded-xl bg-slate-900/20 border border-white/[0.03] px-5 py-2.5 flex items-center gap-3"
               animate={{ opacity: phase === "done" ? 0.6 : 0.2 }}
            >
               <span className="text-sm">{DOWNLOAD_FILES[(loopCount + 2) % DOWNLOAD_FILES.length].icon}</span>
               <div className="flex-1 min-w-0">
                  <p className="text-white/30 text-[11px] truncate">
                     {DOWNLOAD_FILES[(loopCount + 2) % DOWNLOAD_FILES.length].name}
                  </p>
               </div>
            </motion.div>
         </motion.div>
      </div>
   );
}

export default function HarborDropPage() {
   const { t, i18n } = useTranslation();
   const [mounted, setMounted] = useState(false);
   const [lightboxImage, setLightboxImage] = useState<string | null>(null);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return (
         <div className="min-h-screen bg-black text-white">
            <div className="pt-32 pb-16 text-center">
               <h1 className="text-5xl font-bold mb-4">HarborDrop</h1>
               <p className="text-slate-400">Smart Download Management for macOS</p>
            </div>
         </div>
      );
   }

   const lang = i18n.language?.startsWith("ko") ? "ko" : "en";
   const features = t("harbordrop_page.features", { returnObjects: true }) as Array<{ icon: string; title: string; desc: string }>;
   const showcase = t("harbordrop_page.showcase", { returnObjects: true }) as Array<{ title: string; desc: string }>;

   const showcaseImages = [
      "/harbordrop/harbordrop-idm-dialog.png",
      "/harbordrop/harbordrop-file_domain_rules.png",
      "/harbordrop/harbordrop-action.png",
      "/harbordrop/harbordrop-inaction.jpeg",
   ];

   const showcaseIcons = ["🌐", "📂", "⚙️", "📊"];

   const featureBgImages = [
      "/harbordrop/harbordrop-segments.jpeg",
      "/harbordrop/harbordrop-hls.jpeg",
      "/harbordrop/harbordrop-file_domain_rules.png",
   ];

   return (
      <div className="min-h-screen bg-black text-white">

         {/* Hero Section with Animation */}
         <section className="w-full relative overflow-hidden flex items-center justify-center pt-24 pb-16">
            <div
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none z-0"
               style={{ backgroundColor: APP_CONFIG.color }}
            />

            <div className="container mx-auto px-6 relative z-10">
               <div className="grid md:grid-cols-2 gap-8 items-center">

                  {/* Left: Segment Download Animation + App Icon */}
                  <div className="order-2 md:order-1 relative">
                     <ConvergingParticles count={18} />
                     <SegmentDownloadAnimation lang={lang} />

                     {/* App Icon with glow + float animation */}
                     <motion.div
                        className="flex justify-center mt-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                     >
                        <motion.div
                           className="relative"
                           animate={{ y: [0, -8, 0] }}
                           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                           {/* Glow ring */}
                           <motion.div
                              className="absolute inset-0 rounded-2xl blur-xl"
                              style={{ backgroundColor: APP_CONFIG.color }}
                              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                           />
                           <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-500/40">
                              <Image
                                 src={APP_CONFIG.icon}
                                 alt="HarborDrop"
                                 fill
                                 className="object-contain"
                              />
                           </div>
                        </motion.div>
                     </motion.div>
                  </div>

                  {/* Right: Text Content */}
                  <div className="text-center md:text-left space-y-6 order-1 md:order-2">
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30"
                     >
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-emerald-300 text-sm font-medium">
                           {t("harbordrop_page.badge")}
                        </span>
                     </motion.div>

                     <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold"
                     >
                        {APP_CONFIG.title}
                     </motion.h1>
                     <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400"
                     >
                        {t("harbordrop_page.tagline")}
                     </motion.p>

                     {/* Key Stats */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-6 justify-center md:justify-start"
                     >
                        <div className="text-center">
                           <p className="text-2xl font-bold text-emerald-400">6x</p>
                           <p className="text-xs text-slate-500">{lang === "ko" ? "세그먼트" : "Segments"}</p>
                        </div>
                        <div className="text-center">
                           <p className="text-2xl font-bold text-cyan-400">HLS</p>
                           <p className="text-xs text-slate-500">{lang === "ko" ? "스트림 지원" : "Stream Support"}</p>
                        </div>
                        <div className="text-center">
                           <p className="text-2xl font-bold text-purple-400">Auto</p>
                           <p className="text-xs text-slate-500">{lang === "ko" ? "자동화" : "Automation"}</p>
                        </div>
                     </motion.div>

                     {/* Purchase Button */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-4"
                     >
                        <a
                           href="#"
                           className="px-8 py-3 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/30"
                           style={{ backgroundColor: APP_CONFIG.color }}
                        >
                           {t("harbordrop_page.cta_button")}
                        </a>
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>

         {/* In Action Section */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {t("harbordrop_page.in_action_title")}
               </h2>
               <p className="text-slate-400 text-center mb-12 text-lg max-w-3xl mx-auto">
                  {t("harbordrop_page.in_action_body")}
               </p>
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="max-w-5xl mx-auto"
               >
                  <div
                     onClick={() => setLightboxImage("/harbordrop/harbordrop-inaction.jpeg")}
                     className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-emerald-500/30 transition-all group cursor-pointer"
                  >
                     <img
                        src="/harbordrop/harbordrop-inaction.jpeg"
                        alt={t("harbordrop_page.in_action_title")}
                        className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                     />
                  </div>
               </motion.div>
            </div>
         </section>

         {/* Key Features Section */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none z-0" style={{ backgroundColor: APP_CONFIG.color }} />

            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {lang === "ko" ? "주요 기능" : "Key Features"}
               </h2>

               <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {features.map((feature, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.1 }}
                        className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all overflow-hidden"
                     >
                        {/* Background Image */}
                        <div
                           className="absolute inset-0 opacity-30 bg-cover bg-center"
                           style={{ backgroundImage: `url(${featureBgImages[index]})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                        <div className="relative z-10">
                           <span className="text-4xl mb-4 block">{feature.icon}</span>
                           <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                           <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Feature Showcase Section */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {lang === "ko" ? "기능 살펴보기" : "Feature Showcase"}
               </h2>

               {showcase.map((item, index) => (
                  <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: false }}
                     className={index < showcase.length - 1 ? "mb-20" : ""}
                  >
                     <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        {/* Alternate layout: even = image left, odd = image right */}
                        {index % 2 === 0 ? (
                           <>
                              <div>
                                 <div
                                    onClick={() => setLightboxImage(showcaseImages[index])}
                                    className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-emerald-500/30 transition-all group cursor-pointer"
                                 >
                                    <img
                                       src={showcaseImages[index]}
                                       alt={item.title}
                                       className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                 </div>
                              </div>
                              <div className="space-y-4">
                                 <span className="text-4xl">{showcaseIcons[index]}</span>
                                 <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                                 <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className="space-y-4">
                                 <span className="text-4xl">{showcaseIcons[index]}</span>
                                 <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                                 <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                              </div>
                              <div>
                                 <div
                                    onClick={() => setLightboxImage(showcaseImages[index])}
                                    className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-emerald-500/30 transition-all group cursor-pointer"
                                 >
                                    <img
                                       src={showcaseImages[index]}
                                       alt={item.title}
                                       className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                 </div>
                              </div>
                           </>
                        )}
                     </div>
                  </motion.div>
               ))}
            </div>
         </section>

         {/* Screenshots Section */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {lang === "ko" ? "앱 스크린샷" : "App Screenshots"}
               </h2>

               <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <div className="flex gap-8 min-w-max px-4">
                     {APP_CONFIG.screenshots.map((shot, i) => (
                        <div
                           key={i}
                           onClick={() => setLightboxImage(shot)}
                           className="flex-shrink-0 w-[500px] h-[320px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-emerald-500/30 transition-all group cursor-pointer"
                        >
                           <img
                              src={shot}
                              alt={`${APP_CONFIG.title} Screenshot ${i + 1}`}
                              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <p className="text-center text-slate-500 text-sm mt-6">
                  {lang === "ko" ? "← 좌우로 스크롤하여 더 보기 →" : "← Scroll left/right to see more →"}
               </p>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-slate-950 text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: APP_CONFIG.color }} />

            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  {t("harbordrop_page.cta_title")}
               </h2>
               <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                  {t("harbordrop_page.cta_body")}
               </p>
               <a
                  href="#"
                  className="px-10 py-4 text-white rounded-full font-bold text-xl hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/30"
                  style={{ backgroundColor: APP_CONFIG.color }}
               >
                  {t("harbordrop_page.cta_button")}
               </a>
            </div>
         </section>

         {/* Lightbox Modal */}
         <AnimatePresence>
            {lightboxImage && (
               <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightboxImage(null)}
               >
                  <button
                     className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
                     onClick={() => setLightboxImage(null)}
                  >
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>

                  <motion.img
                     src={lightboxImage}
                     alt="Full size screenshot"
                     className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     onClick={(e) => e.stopPropagation()}
                  />

                  <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                     {lang === "ko" ? "클릭하여 닫기" : "Click to close"}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
