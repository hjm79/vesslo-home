"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";
import ConvergingParticles from "@/components/ui/ConvergingParticles";

// Apps that "have" license keys
const KEY_SOURCES = [
   { name: "Photoshop", color: "#31A8FF", icon: "🎨" },
   { name: "Sketch", color: "#F7B500", icon: "✏️" },
   { name: "Figma", color: "#A259FF", icon: "🎯" },
   { name: "Notion", color: "#FFFFFF", icon: "📝" },
   { name: "1Password", color: "#0094F5", icon: "🔑" },
];

// Non-translatable constants
const APP_CONFIG = {
   title: "KeyHarbor",
   color: "#3b82f6",
   icon: "/keyharbor-icon.png",
   screenshots: [
      "/keyharbor-preview.png",
      "/circle/keyharbor_circle-001.png",
      "/circle/keyharbor_circle-002.png",
      "/circle/keyharbor_circle-003.png",
   ],
};

// Key Collection Animation Component
function KeyCollectionAnimation({ lang }: { lang: string }) {
   const [animationPhase, setAnimationPhase] = useState<'collecting' | 'encrypting' | 'secured'>('collecting');
   const [collectedKeys, setCollectedKeys] = useState<number[]>([]);
   const [isAnimating, setIsAnimating] = useState(false);
   const [loopCount, setLoopCount] = useState(0);

   const resetAnimation = () => {
      setAnimationPhase('collecting');
      setCollectedKeys([]);
      setIsAnimating(false);
      setLoopCount(prev => prev + 1);
   };

   useEffect(() => {
      // Start animation after mount or reset
      const timer = setTimeout(() => {
         setIsAnimating(true);
         startCollection();
      }, 500);
      return () => clearTimeout(timer);
   }, [loopCount]);

   // Loop: restart after secured phase
   useEffect(() => {
      if (animationPhase === 'secured') {
         const loopTimer = setTimeout(() => {
            resetAnimation();
         }, 3000); // Wait 3 seconds then restart
         return () => clearTimeout(loopTimer);
      }
   }, [animationPhase]);

   const startCollection = () => {
      // Collect keys one by one
      KEY_SOURCES.forEach((_, index) => {
         setTimeout(() => {
            setCollectedKeys(prev => [...prev, index]);

            // After all keys collected, start encryption
            if (index === KEY_SOURCES.length - 1) {
               setTimeout(() => {
                  setAnimationPhase('encrypting');
                  setTimeout(() => {
                     setAnimationPhase('secured');
                  }, 1500);
               }, 800);
            }
         }, index * 600);
      });
   };

   // Localized status messages
   const getStatusMessage = () => {
      if (animationPhase === 'collecting') {
         return lang === 'ko'
            ? `🔑 수집 중... ${collectedKeys.length}/${KEY_SOURCES.length}`
            : `🔑 Collecting... ${collectedKeys.length}/${KEY_SOURCES.length}`;
      }
      if (animationPhase === 'encrypting') {
         return lang === 'ko'
            ? `🔐 로컬에 안전하게 저장 중...`
            : `🔐 Securing locally...`;
      }
      return lang === 'ko'
         ? `✅ ${KEY_SOURCES.length}개 키 안전하게 보관됨`
         : `✅ ${KEY_SOURCES.length} keys securely stored`;
   };

   return (
      <div className="relative w-full h-[500px] flex items-center justify-center">
         {/* Floating App Icons around the edge */}
         {KEY_SOURCES.map((source, index) => {
            const angle = (index * 72) - 90; // 360/5 = 72 degrees apart
            const radius = 180;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const isCollected = collectedKeys.includes(index);

            return (
               <motion.div
                  key={source.name}
                  className="absolute"
                  initial={{
                     x: x,
                     y: y,
                     opacity: 0,
                     scale: 0.5
                  }}
                  animate={{
                     x: isCollected ? 0 : x,
                     y: isCollected ? 0 : y,
                     opacity: isCollected ? 0 : 1,
                     scale: isCollected ? 0 : 1
                  }}
                  transition={{
                     duration: 0.6,
                     delay: isAnimating ? index * 0.1 : 0,
                     type: "spring",
                     stiffness: 200
                  }}
               >
                  <div
                     className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg border border-white/20"
                     style={{ backgroundColor: source.color + '30' }}
                  >
                     <span>{source.icon}</span>
                  </div>
                  <p className="text-xs text-center mt-1 text-slate-400">{source.name}</p>
               </motion.div>
            );
         })}

         {/* Flying Keys Animation */}
         {collectedKeys.map((keyIndex) => (
            <motion.div
               key={`flying-key-${keyIndex}`}
               className="absolute text-3xl"
               initial={{
                  x: Math.cos(((keyIndex * 72) - 90) * Math.PI / 180) * 180,
                  y: Math.sin(((keyIndex * 72) - 90) * Math.PI / 180) * 180,
                  opacity: 1,
                  scale: 1
               }}
               animate={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0.5
               }}
               transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 150
               }}
            >
               🔑
            </motion.div>
         ))}

         {/* Central KeyHarbor Icon */}
         <motion.div
            className="relative z-10"
            animate={{
               scale: animationPhase === 'encrypting' ? [1, 1.1, 1] : 1,
            }}
            transition={{
               duration: 0.5,
               repeat: animationPhase === 'encrypting' ? 3 : 0,
            }}
         >
            {/* Glow Effect */}
            <motion.div
               className="absolute inset-0 rounded-3xl blur-xl"
               style={{ backgroundColor: '#3b82f6' }}
               animate={{
                  opacity: animationPhase === 'secured' ? 0.5 : 0.2,
                  scale: animationPhase === 'secured' ? 1.2 : 1,
               }}
               transition={{ duration: 0.5 }}
            />

            {/* Main Icon */}
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-500/50">
               <Image
                  src="/keyharbor-icon.png"
                  alt="KeyHarbor"
                  fill
                  className="object-contain"
               />
            </div>

            {/* Lock Icon Overlay (appears during encryption) */}
            <AnimatePresence>
               {animationPhase === 'encrypting' && (
                  <motion.div
                     className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                  >
                     <motion.span
                        className="text-4xl"
                        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                     >
                        🔐
                     </motion.span>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Secured Checkmark */}
            <AnimatePresence>
               {animationPhase === 'secured' && (
                  <motion.div
                     className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ type: "spring", stiffness: 300 }}
                  >
                     <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                     </svg>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>

         {/* Encryption Ring Effect */}
         <AnimatePresence>
            {animationPhase === 'encrypting' && (
               <>
                  <motion.div
                     className="absolute w-48 h-48 rounded-full border-2 border-blue-500/50"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                     transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.div
                     className="absolute w-48 h-48 rounded-full border-2 border-blue-500/30"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                     transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
                  />
               </>
            )}
         </AnimatePresence>

         {/* Key Counter */}
         <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
         >
            <div className="px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/40 backdrop-blur-sm">
               <p className="text-blue-300 font-medium">
                  {getStatusMessage()}
               </p>
            </div>
         </motion.div>
      </div>
   );
}

export default function KeyHarborPage() {
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
               <h1 className="text-5xl font-bold mb-4">KeyHarbor</h1>
               <p className="text-slate-400">Your License Keys, Safely Harbored</p>
            </div>
         </div>
      );
   }

   const lang = i18n.language?.startsWith('ko') ? 'ko' : 'en';
   const features = t('keyharbor_page.features', { returnObjects: true }) as Array<{ icon: string; title: string; desc: string }>;

   return (
      <div className="min-h-screen bg-black text-white relative">

         {/* Unified page-level blue glow background */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[1000px] h-[1200px] rounded-full blur-[250px] opacity-[0.12]" style={{ backgroundColor: '#3b82f6' }} />
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[1000px] h-[1200px] rounded-full blur-[250px] opacity-[0.12]" style={{ backgroundColor: '#3b82f6' }} />
            <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[800px] h-[1000px] rounded-full blur-[250px] opacity-[0.10]" style={{ backgroundColor: '#3b82f6' }} />
         </div>

         {/* Hero Section with Animation */}
         <section className="w-full relative overflow-hidden flex items-center justify-center pt-24 pb-16">
            <div
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none z-0"
               style={{ backgroundColor: APP_CONFIG.color }}
            />

            <div className="container mx-auto px-6 relative z-10">
               <div className="grid md:grid-cols-2 gap-8 items-center">

                  {/* Left: Key Collection Animation with Converging Particles */}
                  <div className="order-2 md:order-1 relative">
                     <ConvergingParticles count={18} />
                     <KeyCollectionAnimation lang={lang} />
                  </div>

                  {/* Right: Text Content */}
                  <div className="text-center md:text-left space-y-6 order-1 md:order-2">
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30"
                     >
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-blue-300 text-sm font-medium">
                           {lang === 'ko' ? '라이선스 키 매니저' : 'License Key Manager'}
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
                        {t('keyharbor_page.tagline')}
                     </motion.p>

                     {/* Key Stats */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-6 justify-center md:justify-start"
                     >
                        <div className="text-center">
                           <p className="text-2xl font-bold text-blue-400">Touch ID</p>
                           <p className="text-xs text-slate-500">{lang === 'ko' ? '생체인증' : 'Biometrics'}</p>
                        </div>
                        <div className="text-center">
                           <p className="text-2xl font-bold text-green-400">100%</p>
                           <p className="text-xs text-slate-500">{lang === 'ko' ? '로컬 저장' : 'Local Storage'}</p>
                        </div>
                        <div className="text-center">
                           <p className="text-2xl font-bold text-purple-400">∞</p>
                           <p className="text-xs text-slate-500">{lang === 'ko' ? '무제한 키' : 'Unlimited Keys'}</p>
                        </div>
                     </motion.div>

                     {/* Download Button */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-4"
                     >
                        <a
                           href="https://hjm79.paddle.com/paddlejs/overlay-checkout?product=79888"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="px-8 py-3 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                           style={{ backgroundColor: APP_CONFIG.color }}
                        >
                           {lang === 'ko' ? '구매하기' : 'Purchase'}
                        </a>
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="py-24 relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {lang === 'ko' ? '주요 기능' : 'Key Features'}
               </h2>

               <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {features.map((feature, index) => {
                     const bgImages = [
                        '/keyharbor/key_back.png',
                        '/keyharbor/wall-back.png',
                        '/keyharbor/bell_back.png'
                     ];
                     return (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: false }}
                           transition={{ delay: index * 0.1 }}
                           className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all overflow-hidden"
                        >
                           {/* Background Image */}
                           <div
                              className="absolute inset-0 opacity-30 bg-cover bg-center"
                              style={{ backgroundImage: `url(${bgImages[index]})` }}
                           />
                           {/* Gradient Overlay for Readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                           {/* Content */}
                           <div className="relative z-10">
                              <span className="text-4xl mb-4 block">{feature.icon}</span>
                              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                           </div>
                        </motion.div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* Feature Showcase Section */}
         <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {lang === 'ko' ? '기능 살펴보기' : 'Feature Showcase'}
               </h2>

               {/* Feature 1: Smart Drag & Drop (Video) */}
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="mb-20"
               >
                  <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                     <div className="order-2 md:order-1">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-blue-500/30 transition-all">
                           <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="none"
                              className="w-full h-auto"
                           >
                              <source src="/keyharbor/keyharbor_add.mp4" type="video/mp4" />
                           </video>
                        </div>
                     </div>
                     <div className="order-1 md:order-2 space-y-4">
                        <span className="text-4xl">🪄</span>
                        <h3 className="text-2xl md:text-3xl font-bold">
                           {lang === 'ko' ? '스마트 드래그 앤 드롭' : 'Smart Drag & Drop'}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                           {lang === 'ko'
                              ? '.app 파일을 드래그 앤 드롭하기만 하면, 앱 이름, 버전, 퍼블리셔, 아이콘까지 모든 정보를 자동으로 추출합니다. 더 이상 수동으로 입력할 필요가 없습니다.'
                              : 'Just drag and drop a .app file—KeyHarbor automatically extracts the app name, version, publisher, and icon. No manual entry required.'}
                        </p>
                     </div>
                  </div>
               </motion.div>

               {/* Feature 2: Tags, Notes, Attachments (Image) */}
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="mb-20"
               >
                  <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                     <div className="space-y-4">
                        <span className="text-4xl">🏷️</span>
                        <h3 className="text-2xl md:text-3xl font-bold">
                           {lang === 'ko' ? '태그, 노트, 파일 첨부' : 'Tags, Notes & Attachments'}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                           {lang === 'ko'
                              ? '라이선스에 태그를 달아 분류하고, 마크다운 메모를 추가하며, 영수증이나 인보이스 파일을 첨부하세요. 모든 정보를 한 곳에서 관리할 수 있습니다.'
                              : 'Organize with tags, add markdown notes, and attach receipt or invoice files. Keep all your license information in one place.'}
                        </p>
                     </div>
                     <div
                        onClick={() => setLightboxImage('/keyharbor/keyharbor_addtag.png')}
                        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-blue-500/30 transition-all group cursor-pointer"
                     >
                        <img
                           src="/keyharbor/keyharbor_addtag.png"
                           alt={lang === 'ko' ? '태그, 노트, 파일 첨부' : 'Tags, Notes & Attachments'}
                           loading="lazy"
                           className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                        />
                     </div>
                  </div>
               </motion.div>

               {/* Feature 3: Touch ID (Image) */}
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
               >
                  <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                     <div className="order-2 md:order-1">
                        <div
                           onClick={() => setLightboxImage('/keyharbor/keyharbor_touchid.png')}
                           className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-blue-500/30 transition-all group cursor-pointer"
                        >
                           <img
                              src="/keyharbor/keyharbor_touchid.png"
                              alt={lang === 'ko' ? 'Touch ID 지원' : 'Touch ID Support'}
                              loading="lazy"
                              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                           />
                        </div>
                     </div>
                     <div className="order-1 md:order-2 space-y-4">
                        <span className="text-4xl">🛡️</span>
                        <h3 className="text-2xl md:text-3xl font-bold">
                           {lang === 'ko' ? 'Touch ID로 빠른 잠금 해제' : 'Quick Unlock with Touch ID'}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                           {lang === 'ko'
                              ? '매번 비밀번호를 입력할 필요 없이, 지문 인식(Touch ID)으로 0.1초 만에 라이선스 금고를 열 수 있습니다. macOS의 Secure Enclave을 활용한 안전한 인증입니다.'
                              : 'Unlock your license vault in 0.1s with Touch ID—no password needed. Secure authentication powered by macOS Secure Enclave.'}
                        </p>
                     </div>
                  </div>
               </motion.div>

               {/* Feature 4: Homebrew Integration (Image) */}
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="mt-20"
               >
                  <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                     <div className="space-y-4">
                        <span className="text-4xl">🍺</span>
                        <h3 className="text-2xl md:text-3xl font-bold">
                           {lang === 'ko' ? 'Homebrew Cask 통합' : 'Homebrew Cask Integration'}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                           {lang === 'ko'
                              ? '등록된 앱의 이름으로 Homebrew Cask를 자동 검색하고, brew install --cask 명령어를 바로 복사하세요. Mac을 포맷하고 다시 세팅할 때 매우 유용합니다.'
                              : 'Automatically search Homebrew Casks by app name and copy the brew install --cask command instantly. Perfect for quick Mac reinstalls.'}
                        </p>
                     </div>
                     <div
                        onClick={() => setLightboxImage('/keyharbor/keyharbor_brew.png')}
                        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-blue-500/30 transition-all group cursor-pointer"
                     >
                        <img
                           src="/keyharbor/keyharbor_brew.png"
                           alt={lang === 'ko' ? 'Homebrew Cask 통합' : 'Homebrew Cask Integration'}
                           loading="lazy"
                           className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                        />
                     </div>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* Screenshots Section */}
         <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {lang === 'ko' ? '앱 스크린샷' : 'App Screenshots'}
               </h2>

               <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <div className="flex gap-8 min-w-max px-4">
                     {APP_CONFIG.screenshots.map((shot, i) => (
                        <div
                           key={i}
                           onClick={() => setLightboxImage(shot)}
                           className="flex-shrink-0 w-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-blue-500/30 transition-all group cursor-pointer"
                        >
                           <img
                              src={shot}
                              alt={`${APP_CONFIG.title} Screenshot ${i + 1}`}
                              loading="lazy"
                              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <p className="text-center text-slate-500 text-sm mt-6">
                  {lang === 'ko' ? '← 좌우로 스크롤하여 더 보기 →' : '← Scroll left/right to see more →'}
               </p>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-24 relative overflow-hidden text-center">

            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  {lang === 'ko' ? '지금 바로 시작하세요' : 'Get Started Today'}
               </h2>
               <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                  {lang === 'ko'
                     ? '무료로 다운로드하고 라이선스 키 관리를 시작하세요.'
                     : 'Download for free and start managing your license keys.'}
               </p>
               <a
                  href="https://hjm79.paddle.com/paddlejs/overlay-checkout?product=79888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 text-white rounded-full font-bold text-xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/30"
                  style={{ backgroundColor: APP_CONFIG.color }}
               >
                  {lang === 'ko' ? '구매하기' : 'Purchase'}
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
                  {/* Close Button */}
                  <button
                     className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
                     onClick={() => setLightboxImage(null)}
                  >
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>

                  {/* Full Size Image */}
                  <motion.img
                     src={lightboxImage}
                     alt="Full size screenshot"
                     className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     onClick={(e) => e.stopPropagation()}
                  />

                  {/* Hint Text */}
                  <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                     {lang === 'ko' ? '클릭하여 닫기' : 'Click to close'}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
