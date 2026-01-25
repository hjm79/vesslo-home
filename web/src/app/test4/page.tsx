"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/i18n";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Section 3: CoverFlow
const CoverFlow = dynamic(() => import("@/components/canvas/CoverFlow"), { ssr: false });

export default function TestPage4() {
   const { t } = useTranslation();
   const router = useRouter();
   const [activeApp, setActiveApp] = useState<any>(null);

   const handleAppChange = (app: any) => {
      setActiveApp(app);
   };

   const handleNavigate = (slug: string) => {
      window.location.assign(`/${slug}`);
   };

   const APPS = [
      { slug: "vesslo", preview: "/vesslo-preview.png" },
      { slug: "keyharbor", preview: "/keyharbor-preview.png" },
      { slug: "splitswipe", preview: "/splitswipe-preview.png" },
   ];

   return (
      <div className="w-screen overflow-x-hidden bg-black" suppressHydrationWarning>
         {/* ============ SECTION 1: Hero (2D Typography) ============ */}
         <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-black">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 text-center space-y-6 px-4">
               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40" suppressHydrationWarning>
                  {t('subtitle_line_1')}
               </h1>
               <p className="text-2xl md:text-3xl text-slate-400 font-light" suppressHydrationWarning>
                  {t('subtitle_line_2')}
               </p>
            </div>

            <div className="absolute bottom-20 animate-bounce text-white/50" suppressHydrationWarning>
               {t('scroll_to_explore')}
            </div>
         </section>

         {/* ============ SECTION 2: App List (Pure HTML) ============ */}
         <section className="w-full bg-slate-950 py-24 relative z-10">
            <div className="container mx-auto px-6">
               <h2 className="text-4xl font-bold text-white mb-16 text-center" suppressHydrationWarning>{t('our_ecosystem')}</h2>
               <div className="space-y-32">
                  {APPS.map((app, index) => (
                     <div key={app.slug} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex-1 text-center md:text-left">
                           <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6" suppressHydrationWarning>
                              {t(`apps.${app.slug}.title`)}
                           </h3>
                           <p className="text-xl text-slate-300 mb-8 leading-relaxed" suppressHydrationWarning>
                              {t(`apps.${app.slug}.description`)}
                           </p>
                           <a href={`/${app.slug}`}>
                              <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-medium" suppressHydrationWarning>
                                 {t('learn_more')}
                              </button>
                           </a>
                        </div>
                        <div className="flex-1 flex justify-center">
                           <div className="w-full max-w-md h-[282px] bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl flex items-center justify-center overflow-hidden relative group">
                              <img
                                 src={app.preview}
                                 alt={`${t(`apps.${app.slug}.title`)} Preview`}
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                 onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ============ SECTION 3: CoverFlow ============ */}
         <section className="w-full bg-black relative z-20 border-t border-white/10">
            <div className="py-12 text-center" suppressHydrationWarning>
               <h2 className="text-3xl font-bold text-white mb-4" suppressHydrationWarning>{t('featured_gallery')}</h2>
               <p className="text-slate-400 mb-8" suppressHydrationWarning>{t('swipe_to_explore')}</p>
            </div>

            {/* Container for CoverFlow + Overlay */}
            <div className="relative w-full h-[80vh]">
               <CoverFlow onAppChange={handleAppChange} onNavigate={handleNavigate} />

               {/* Info Overlay */}
               <div className={`absolute bottom-10 left-0 w-full flex justify-center pointer-events-none transition-opacity duration-500 ${activeApp ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 max-w-lg text-center border border-white/10 pointer-events-auto shadow-2xl" suppressHydrationWarning>
                     <h3 className="text-4xl font-bold text-white mb-2" style={{ color: activeApp?.color || 'white' }}>
                        {activeApp?.title}
                     </h3>
                     <p className="text-slate-300 mb-6 text-lg">
                        {activeApp?.desc}
                     </p>
                     <a href={`/${activeApp?.slug || '#'}`}>
                        <button className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors" suppressHydrationWarning>
                           {t('learn_more')}
                        </button>
                     </a>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer */}
         <Footer />
      </div>
   );
}
