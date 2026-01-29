"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import "../../i18n";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";

// Dynamically import CoverFlow to avoid SSR issues with Canvas
// Dynamically import CoverFlow and R3F components to avoid SSR issues
const CoverFlow = dynamic(() => import("../canvas/CoverFlow"), { ssr: false });
const VessloText3D = dynamic(() => import("../canvas/VessloText3D"), { ssr: false });
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });

// import { useRouter } from "next/navigation";

export default function InterfaceTest() {
   const { t } = useTranslation();

   const handleNavigate = (slug: string) => {
      window.location.assign(`/${slug}`);
   };

   const APPS = [
      {
         slug: "vesslo",
         preview: "/vesslo-preview.png"
      },
      {
         slug: "keyharbor",
         preview: "/keyharbor-preview.png"
      },
      {
         slug: "splitswipe",
         preview: "/splitswipe-preview.png"
      },
   ];

   return (
      <div className="w-screen overflow-x-hidden" suppressHydrationWarning>
         {/* Section 1: Spline 3D Hero */}
         <section className="h-[55vh] md:h-[65vh] w-full relative bg-black overflow-hidden">
            {/* Background Gradient Blob (From Test4) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full h-full relative z-0">
               <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                  <VessloText3D />
               </Canvas>
            </div>
            {/* Cinematic Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] w-full h-full mix-blend-multiply" />
         </section>

         {/* Section 2: App List */}
         <section className="w-full bg-slate-950 py-24 relative z-10">
            <div className="container mx-auto px-6 mb-24">
               <h2 className="text-4xl font-bold text-white mb-16 text-center">{t('our_ecosystem')}</h2>
               <div className="space-y-32">
                  {APPS.map((app, index) => (
                     <div key={app.slug} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex-1 text-center md:text-left">
                           <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
                              {t(`apps.${app.slug}.title`)}
                           </h3>
                           <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                              {t(`apps.${app.slug}.description`)}
                           </p>
                           <Link href={`/${app.slug}`}>
                              <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-medium">
                                 {t('learn_more')}
                              </button>
                           </Link>
                        </div>
                        <div className="flex-1 flex justify-center">
                           <div className="w-full max-w-md h-[282px] bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl flex items-center justify-center overflow-hidden relative group">
                              <img
                                 src={app.preview}
                                 alt={`${t(`apps.${app.slug}.title`)} Preview`}
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                 onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                 }}
                                 style={{ display: 'block' }}
                              />
                              <div className="hidden absolute inset-0 flex items-center justify-center">
                                 <span className="text-white/20 font-bold text-2xl">{t(`apps.${app.slug}.title`)} Preview</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* NEW: Cover Flow Section at the Bottom */}
         <section className="w-full bg-black relative z-20 border-t border-white/10">
            <div className="py-12 text-center">
               <h2 className="text-3xl font-bold text-white mb-4">{t('featured_gallery')}</h2>
               <p className="text-slate-400 mb-8">{t('swipe_to_explore')}</p>
            </div>
            {/* CoverFlow container */}
            <div className="w-full h-[80vh]">
               <CoverFlow onNavigate={handleNavigate} />
            </div>
         </section>

         {/* Footer integrated into scroll flow */}
         <Footer />
      </div>
   );
}
