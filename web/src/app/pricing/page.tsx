"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { motion } from "framer-motion";
import Image from "next/image";
import FloatingParticles from "@/components/ui/FloatingParticles";

// Non-translatable constants (icons, colors, prices, Paddle links)
const APPS_CONFIG = [
   { key: "vesslo", name: "Vesslo", price: "$9.99", icon: "/vesslo_icon.png", color: "#06b6d4" },
   { key: "keyharbor", name: "KeyHarbor", price: "$6.99", icon: "/keyharbor-icon.png", color: "#3b82f6" },
   { key: "splitswipe", name: "SplitSwipe", price: "$5.99", icon: "/splitswipe-icon.png", color: "#8b5cf6" },
   { key: "harbordrop", name: "HarborDrop", price: "$9.99", icon: "/harbordrop-icon.png", color: "#10b981" },
];

export default function PricingPage() {
   const { t } = useTranslation();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return (
         <div className="min-h-screen bg-black text-white">
            <div className="pt-32 pb-16 text-center">
               <h1 className="text-5xl font-bold mb-4">Pricing</h1>
               <p className="text-slate-400">Simple, One-Time Pricing</p>
            </div>
         </div>
      );
   }

   const faqItems = t('pricing_page.faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;


   return (
      <div className="min-h-screen bg-black text-white">

         {/* Hero */}
         <section className="pt-32 pb-16 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-[150px] pointer-events-none" />

            {/* Floating Particles */}
            <FloatingParticles count={30} />

            <div className="container mx-auto px-6 relative z-10 text-center">
               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-bold mb-4"
                  suppressHydrationWarning
               >
                  {t('pricing_page.title')}
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-slate-400"
                  suppressHydrationWarning
               >
                  {t('pricing_page.subtitle')}
               </motion.p>
            </div>
         </section>

         {/* Pricing Cards */}
         <section className="py-16">
            <div className="container mx-auto px-6">
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  {APPS_CONFIG.map((app, index) => {
                     const features = t(`pricing_page.${app.key}.features`, { returnObjects: true }) as string[];
                     return (
                        <motion.div
                           key={app.name}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           whileHover={{ y: -12, transition: { duration: 0.1 } }}
                           transition={{ delay: index * 0.1, y: { duration: 0 } }}
                           className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 hover:shadow-2xl transition-all group cursor-pointer"
                        >
                           {/* App Icon */}
                           <div className="w-20 h-20 mb-6 relative">
                              <Image
                                 src={app.icon}
                                 alt={app.name}
                                 fill
                                 className="object-contain"
                              />
                           </div>

                           {/* App Name & Description */}
                           <h3 className="text-2xl font-bold mb-2" suppressHydrationWarning>{app.name}</h3>
                           <p className="text-slate-400 text-sm mb-6" suppressHydrationWarning>{t(`pricing_page.${app.key}.description`)}</p>

                           {/* Price */}
                           <div className="mb-6">
                              <span className="text-4xl font-bold" style={{ color: app.color }}>
                                 {app.price}
                              </span>
                              <span className="text-slate-500 ml-2">USD</span>
                           </div>

                           {/* Features */}
                           <ul className="space-y-3 mb-8">
                              {features.map((feature: string, i: number) => (
                                 <li key={i} className="flex items-center gap-3 text-sm text-slate-300" suppressHydrationWarning>
                                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: app.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                 </li>
                              ))}
                           </ul>

                           {/* Buy Button */}
                           <button
                              className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                              style={{ backgroundColor: app.color }}
                              suppressHydrationWarning
                           >
                              {t('pricing_page.buy_button')}
                           </button>
                        </motion.div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* Paddle Notice */}
         <section className="py-8">
            <div className="container mx-auto px-6 text-center">
               <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                  <span className="text-2xl">🛡️</span>
                  <p className="text-slate-400 text-sm" suppressHydrationWarning>{t('pricing_page.paddle_notice')}</p>
               </div>
            </div>
         </section>

         {/* FAQ */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('pricing_page.faq.title')}</h2>

               <div className="max-w-3xl mx-auto space-y-6">
                  {faqItems.map((item, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6"
                     >
                        <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                        <p className="text-slate-400">{item.a}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
}
