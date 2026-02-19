"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";
import FloatingParticles from "@/components/ui/FloatingParticles";

// Non-translatable constants
const APP_CONFIG = {
   title: "SplitSwipe",
   color: "#f97316",
   icon: "/splitswipe-icon.png",
   video: {
      mp4: "/splitswipe/splitswipe_move.mp4",
      webm: "/splitswipe/splitswipe_move.webm"
   },
   screenshots: ["/splitswipe-preview.png"],
};

// Window colors for the demo
const WINDOW_COLORS = [
   { name: "Safari", color: "#3B82F6", icon: "🌐" },
   { name: "Notes", color: "#FBBF24", icon: "📝" },
   { name: "Terminal", color: "#10B981", icon: "⬛" },
];

// Window Split Animation Component
function WindowSplitAnimation({ lang }: { lang: string }) {
   const [phase, setPhase] = useState<'scattered' | 'split2' | 'rotate2' | 'split3' | 'rotate3' | 'complete'>('scattered');
   const [rotationIndex, setRotationIndex] = useState(0);
   const [loopCount, setLoopCount] = useState(0);

   useEffect(() => {
      const sequence = async () => {
         // Phase 1: Scattered (initial)
         await new Promise(r => setTimeout(r, 1000));

         // Phase 2: 2-split (1|2)
         setPhase('split2');
         await new Promise(r => setTimeout(r, 1500));

         // Phase 2b: Rotate in 2-split
         setPhase('rotate2');
         setRotationIndex(1);
         await new Promise(r => setTimeout(r, 800));
         setRotationIndex(0);
         await new Promise(r => setTimeout(r, 800));

         // Phase 3: 3-split (1|2|3)
         setPhase('split3');
         setRotationIndex(0);
         await new Promise(r => setTimeout(r, 1500));

         // Phase 3b: Rotate in 3-split
         setPhase('rotate3');
         setRotationIndex(1);
         await new Promise(r => setTimeout(r, 600));
         setRotationIndex(2);
         await new Promise(r => setTimeout(r, 600));
         setRotationIndex(0);
         await new Promise(r => setTimeout(r, 600));

         // Phase 4: Complete
         setPhase('complete');
         await new Promise(r => setTimeout(r, 1500));

         // Reset and loop
         setPhase('scattered');
         setRotationIndex(0);
         setLoopCount(prev => prev + 1);
      };

      sequence();
   }, [loopCount]);

   // Get window positions based on current phase
   const getWindowStyle = (index: number) => {
      const baseStyle = {
         transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      };

      if (phase === 'scattered') {
         // Random scattered positions
         const scatteredPositions = [
            { left: '10%', top: '15%', width: '35%', height: '45%', rotate: -5 },
            { left: '45%', top: '25%', width: '40%', height: '40%', rotate: 4 },
            { left: '20%', top: '50%', width: '30%', height: '35%', rotate: -3 },
         ];
         return { ...baseStyle, ...scatteredPositions[index], transform: `rotate(${scatteredPositions[index].rotate}deg)` };
      }

      if (phase === 'split2' || phase === 'rotate2') {
         // 2-split horizontal: 1|2 (two side by side, third hidden)
         const positions = [
            { left: '2%', top: '5%', width: '47%', height: '90%' },
            { left: '51%', top: '5%', width: '47%', height: '90%' },
         ];

         // For rotation, swap positions
         let posIndex = index;
         if (phase === 'rotate2' && index < 2) {
            posIndex = rotationIndex === 1 ? (index === 0 ? 1 : 0) : index;
         }

         if (index === 2) {
            // Third window hidden during 2-split
            return { ...baseStyle, left: '70%', top: '70%', width: '20%', height: '20%', opacity: 0.2, transform: 'rotate(0deg) scale(0.8)', zIndex: 0 };
         }

         return {
            ...baseStyle,
            ...positions[posIndex],
            transform: 'rotate(0deg)',
            opacity: 1,
            zIndex: 10,
         };
      }

      if (phase === 'split3' || phase === 'rotate3' || phase === 'complete') {
         // 3-split horizontal: 1|2|3 (three side by side)
         const positions = [
            { left: '2%', top: '5%', width: '31%', height: '90%' },
            { left: '35%', top: '5%', width: '31%', height: '90%' },
            { left: '68%', top: '5%', width: '30%', height: '90%' },
         ];

         // For rotation, cycle positions
         let posIndex = index;
         if (phase === 'rotate3') {
            posIndex = (index + rotationIndex) % 3;
         }

         return { ...baseStyle, ...positions[posIndex], transform: 'rotate(0deg)', opacity: 1, zIndex: 10 };
      }

      return baseStyle;
   };

   const getStatusMessage = () => {
      if (phase === 'scattered') {
         return lang === 'ko' ? '🪟 창 정리 준비...' : '🪟 Preparing windows...';
      }
      if (phase === 'split2') {
         return lang === 'ko' ? '⬅️➡️ 2분할 (1|2)' : '⬅️➡️ 2-Split (1|2)';
      }
      if (phase === 'rotate2') {
         return lang === 'ko' ? '🔄 앱 순환 중...' : '🔄 Rotating apps...';
      }
      if (phase === 'split3') {
         return lang === 'ko' ? '📐 3분할 (1|2|3)' : '📐 3-Split (1|2|3)';
      }
      if (phase === 'rotate3') {
         return lang === 'ko' ? '🔄 앱 순환 중...' : '🔄 Rotating apps...';
      }
      return lang === 'ko' ? '✅ 정리 완료!' : '✅ Organized!';
   };

   return (
      <div className="relative w-full h-[400px] flex flex-col items-center justify-center">
         {/* Virtual Screen */}
         <div className="relative w-[320px] h-[200px] bg-slate-800/50 rounded-lg border border-white/20 shadow-2xl overflow-hidden">
            {/* Screen bezel effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Windows */}
            {WINDOW_COLORS.map((window, index) => (
               <motion.div
                  key={window.name}
                  className="absolute rounded-md shadow-lg overflow-hidden"
                  style={getWindowStyle(index) as React.CSSProperties}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
               >
                  {/* Window title bar */}
                  <div
                     className="h-5 flex items-center px-2 gap-1"
                     style={{ backgroundColor: window.color }}
                  >
                     <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                     </div>
                     <span className="text-[8px] text-white/80 ml-1">{window.name}</span>
                  </div>
                  {/* Window content */}
                  <div
                     className="flex-1 flex items-center justify-center text-2xl"
                     style={{ backgroundColor: window.color + '40', minHeight: 'calc(100% - 20px)' }}
                  >
                     {window.icon}
                  </div>
               </motion.div>
            ))}

            {/* Snap grid overlay - shows during split phases */}
            {(phase === 'split2' || phase === 'split3') && (
               <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               >
                  {phase === 'split2' && (
                     <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-500/50" />
                  )}
                  {phase === 'split3' && (
                     <>
                        {/* Two vertical lines for 1|2|3 horizontal split */}
                        <div className="absolute left-[33%] top-0 bottom-0 w-0.5 bg-orange-500/50" />
                        <div className="absolute left-[66%] top-0 bottom-0 w-0.5 bg-orange-500/50" />
                     </>
                  )}
               </motion.div>
            )}
         </div>

         {/* SplitSwipe Icon below screen */}
         <motion.div
            className="mt-6 relative"
            animate={{
               scale: phase === 'complete' ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
         >
            <div className={`
               w-16 h-16 rounded-2xl overflow-hidden shadow-xl
               transition-all duration-500
               ${phase === 'complete' ? 'shadow-orange-500/50' : 'shadow-orange-500/20'}
            `}>
               <img src="/splitswipe-icon.png" alt="SplitSwipe" loading="lazy" className="w-full h-full object-cover" />
            </div>
         </motion.div>

         {/* Status message */}
         <motion.p
            className="mt-4 text-sm text-slate-400 font-medium"
            key={phase}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
         >
            {getStatusMessage()}
         </motion.p>
      </div>
   );
}

export default function SplitSwipePage() {
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
               <h1 className="text-5xl font-bold mb-4">SplitSwipe</h1>
               <p className="text-slate-400">Intuitive Window Management for macOS</p>
            </div>
         </div>
      );
   }

   const lang = i18n.language?.startsWith('ko') ? 'ko' : 'en';
   const features = t('splitswipe_page.features', { returnObjects: true }) as Array<{ icon: string; title: string; desc: string }>;

   return (
      <div className="min-h-screen bg-black text-white relative">

         {/* Unified page-level orange glow background */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[1000px] h-[1200px] rounded-full blur-[250px] opacity-[0.12]" style={{ backgroundColor: '#f97316' }} />
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[1000px] h-[1200px] rounded-full blur-[250px] opacity-[0.12]" style={{ backgroundColor: '#f97316' }} />
            <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[800px] h-[1000px] rounded-full blur-[250px] opacity-[0.10]" style={{ backgroundColor: '#f97316' }} />
         </div>

         {/* Hero Section */}
         <section className="w-full relative overflow-hidden flex items-center justify-center pt-40 pb-24">
            <div
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none z-0"
               style={{ backgroundColor: APP_CONFIG.color }}
            />

            {/* Floating Particles */}
            <FloatingParticles count={30} />

            <div className="container mx-auto px-6 relative z-10">
               <div className="grid md:grid-cols-2 gap-16 items-center">

                  {/* Left: Window Split Animation */}
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.8 }}
                     className="flex justify-center"
                  >
                     <WindowSplitAnimation lang={lang} />
                  </motion.div>

                  {/* Right: Text Content */}
                  <div className="text-center md:text-left space-y-6">
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
                        {t('splitswipe_page.tagline')}
                     </motion.p>

                     {/* Feature Highlights */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="pt-4 space-y-4"
                     >
                        <div className="flex items-center gap-3 text-slate-300">
                           <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">✨</span>
                           <span>{lang === 'ko' ? '2분할 & 3분할 레이아웃 지원' : '2-Split & 3-Split layouts'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                           <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">🔄</span>
                           <span>{lang === 'ko' ? '키보드/제스처로 앱 순환' : 'Rotate apps with keyboard/gestures'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                           <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">⚡</span>
                           <span>{lang === 'ko' ? 'BetterTouchTool 연동 지원' : 'BetterTouchTool integration'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                           <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">🎯</span>
                           <span>{lang === 'ko' ? '파워 유저를 위한 창 관리' : 'Window management for power users'}</span>
                        </div>
                     </motion.div>

                     {/* Download Button */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pt-4"
                     >
                        <a
                           href="https://hjm79.paddle.com/paddlejs/overlay-checkout?product=79888"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="px-8 py-3 text-white rounded-full font-bold text-lg transition-colors"
                           style={{ backgroundColor: APP_CONFIG.color }}
                        >
                           {lang === 'ko' ? '구매하기' : 'Purchase'}
                        </a>
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>

         {/* Video Section */}
         <section className="py-20 relative overflow-hidden">


            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-3xl font-bold text-center mb-12">
                  {lang === 'ko' ? '실제 동작' : 'In Action'}
               </h2>

               <div className="flex justify-center">
                  <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                     <video autoPlay loop muted playsInline preload="none" className="w-full h-auto">
                        <source src={APP_CONFIG.video.webm} type="video/webm" />
                        <source src={APP_CONFIG.video.mp4} type="video/mp4" />
                     </video>
                  </div>
               </div>

               {/* Video Description */}
               <div className="mt-8 text-center max-w-2xl mx-auto">
                  <p className="text-slate-400 leading-relaxed">
                     {lang === 'ko'
                        ? '영상의 화살표는 키보드 단축키 또는 트랙패드 제스처를 통해 앱이 어떻게 순환되는지 보여줍니다. 2분할(1|2) 또는 3분할(1|2|3) 레이아웃에서 할당된 앱들을 손쉽게 전환할 수 있습니다.'
                        : 'The arrows in the video demonstrate how apps rotate using keyboard shortcuts or trackpad gestures. Easily switch between assigned apps in 2-split (1|2) or 3-split (1|2|3) layouts.'
                     }
                  </p>
               </div>

               {/* Second Video: 3-Split Demo */}
               <div className="mt-16">
                  <h3 className="text-2xl font-bold text-center mb-8">
                     {lang === 'ko' ? '3분할 작동 화면' : '3-Split in Action'}
                  </h3>
                  <div className="flex justify-center">
                     <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <video autoPlay loop muted playsInline preload="none" className="w-full h-auto">
                           <source src="/splitswipe/splitswipe_3move.mp4" type="video/mp4" />
                        </video>
                     </div>
                  </div>
                  <div className="mt-8 text-center max-w-2xl mx-auto">
                     <p className="text-slate-400 leading-relaxed">
                        {lang === 'ko'
                           ? '빨간색으로 표시되는 창은 크기를 줄이는 데 제한이 있거나 제외된 앱입니다.'
                           : 'Windows highlighted in red indicate apps with size restrictions or excluded apps.'
                        }
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="py-20 relative overflow-hidden">


            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                  {lang === 'ko' ? '주요 기능' : 'Key Features'}
               </h2>

               <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {features.map((feature, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                     >
                        <span className="text-4xl mb-4 block">{feature.icon}</span>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Feature Showcase Section */}
         <section className="py-20 relative overflow-hidden">


            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                  {lang === 'ko' ? '기능 상세' : 'Feature Showcase'}
               </h2>

               {/* Feature 1: 2-Split & 3-Split */}
               <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                  <div className="md:w-1/2">
                     <div
                        className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer hover:border-white/30 transition-all"
                        onClick={() => setLightboxImage('/splitswipe/splitswipe_3split.jpeg')}
                     >
                        <Image
                           src="/splitswipe/splitswipe_3split.jpeg"
                           alt="2-Split and 3-Split layouts"
                           width={800}
                           height={500}
                           className="w-full h-auto hover:scale-105 transition-transform duration-300"
                        />
                     </div>
                  </div>
                  <div className="md:w-1/2">
                     <h3 className="text-2xl font-bold mb-4" style={{ color: APP_CONFIG.color }}>
                        {lang === 'ko' ? '2분할 & 3분할 지원' : '2-Split & 3-Split Support'}
                     </h3>
                     <p className="text-lg text-slate-300 leading-relaxed">
                        {lang === 'ko'
                           ? '화면을 2개 또는 3개의 영역으로 나누어 효율적으로 작업하세요. 각 영역에 원하는 앱을 할당하고 전환할 수 있습니다.'
                           : 'Divide your screen into 2 or 3 zones for efficient multitasking. Assign and switch apps in each zone as needed.'
                        }
                     </p>
                  </div>
               </div>

               {/* Feature 2: Keyboard Shortcuts - Reversed */}
               <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-20">
                  <div className="md:w-1/2">
                     <div
                        className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer hover:border-white/30 transition-all"
                        onClick={() => setLightboxImage('/splitswipe/splitswipe_shortcuts.jpeg')}
                     >
                        <Image
                           src="/splitswipe/splitswipe_shortcuts.jpeg"
                           alt="Keyboard shortcuts"
                           width={800}
                           height={500}
                           className="w-full h-auto hover:scale-105 transition-transform duration-300"
                        />
                     </div>
                  </div>
                  <div className="md:w-1/2">
                     <h3 className="text-2xl font-bold mb-4" style={{ color: APP_CONFIG.color }}>
                        {lang === 'ko' ? '키보드 단축키 지원' : 'Keyboard Shortcuts'}
                     </h3>
                     <p className="text-lg text-slate-300 leading-relaxed">
                        {lang === 'ko'
                           ? '키보드 단축키로 빠르게 창을 분할하고 앱을 순환시킬 수 있습니다. 마우스 없이도 완벽한 창 관리가 가능합니다.'
                           : 'Quickly split windows and rotate apps with keyboard shortcuts. Perfect window management without a mouse.'
                        }
                     </p>
                  </div>
               </div>

               {/* Feature 3: Overview Mode */}
               <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-1/2">
                     <div
                        className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer hover:border-white/30 transition-all"
                        onClick={() => setLightboxImage('/splitswipe/splitswipe_overview.jpeg')}
                     >
                        <Image
                           src="/splitswipe/splitswipe_overview.jpeg"
                           alt="Overview mode"
                           width={800}
                           height={500}
                           className="w-full h-auto hover:scale-105 transition-transform duration-300"
                        />
                     </div>
                  </div>
                  <div className="md:w-1/2">
                     <h3 className="text-2xl font-bold mb-4" style={{ color: APP_CONFIG.color }}>
                        {lang === 'ko' ? '오버뷰 모드' : 'Overview Mode'}
                     </h3>
                     <p className="text-lg text-slate-300 leading-relaxed">
                        {lang === 'ko'
                           ? '각 영역에 어떤 앱이 할당되어 있는지 한눈에 확인할 수 있는 오버뷰 모드를 지원합니다.'
                           : 'Overview mode lets you see at a glance which apps are assigned to each zone.'
                        }
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20 relative overflow-hidden text-center">


            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  {lang === 'ko' ? '지금 바로 시작하세요' : 'Get Started Today'}
               </h2>
               <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                  {lang === 'ko'
                     ? '무료로 다운로드하고 화면 관리의 새로운 경험을 시작하세요.'
                     : 'Download for free and start experiencing the new way of window management.'}
               </p>
               <a
                  href="https://hjm79.paddle.com/paddlejs/overlay-checkout?product=79888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 text-white rounded-full font-bold text-xl hover:opacity-90 transition-opacity shadow-lg"
                  style={{ backgroundColor: APP_CONFIG.color }}
               >
                  {lang === 'ko' ? '구매하기' : 'Purchase'}
               </a>
            </div>
         </section>

         {/* Lightbox Modal */}
         {lightboxImage && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
               onClick={() => setLightboxImage(null)}
            >
               <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-7xl max-h-[90vh] cursor-default"
                  onClick={(e) => e.stopPropagation()}
               >
                  <button
                     onClick={() => setLightboxImage(null)}
                     className="absolute -top-12 right-0 text-white/70 hover:text-white text-xl font-bold"
                  >
                     ✕ {lang === 'ko' ? '닫기' : 'Close'}
                  </button>
                  <Image
                     src={lightboxImage}
                     alt="Feature screenshot"
                     width={1600}
                     height={1000}
                     className="max-w-full max-h-[85vh] object-contain rounded-lg"
                  />
               </motion.div>
            </motion.div>
         )}
      </div>
   );
}
