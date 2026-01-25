"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import "../../i18n"; // Ensure i18n is initialized

export default function Interface() {
   const { t } = useTranslation();

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
      <div className="w-screen overflow-x-hidden">
         {/* Section 1 Spacer - transparent to let Diamond show */}
         <section className="h-screen w-full flex flex-col justify-end items-center pb-20 pointer-events-none">
            <div className="animate-bounce text-white/50">
               {t('scroll_to_explore')}
            </div>
         </section>

         {/* Section 2: App List */}
         <section className="w-full bg-slate-950 py-24 relative z-10">
            <div className="container mx-auto px-6">
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
                           {/* App Preview Image or Placeholder */}
                           <div className="w-full max-w-md h-[282px] bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl flex items-center justify-center overflow-hidden relative group">
                              {/* We use specific filenames that the user will provide in /public */}
                              <img
                                 src={app.preview}
                                 alt={`${t(`apps.${app.slug}.title`)} Preview`}
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                 onError={(e) => {
                                    // Fallback if image not found
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                 }}
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

         {/* Footer is already in layout */}
      </div>
   );
}
