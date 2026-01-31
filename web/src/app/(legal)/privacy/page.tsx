"use client";

import { useTranslation } from "react-i18next";
import "@/i18n";

export default function PrivacyPage() {
   const { t } = useTranslation();

   return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

         <div className="container mx-auto px-4 py-32 relative z-10">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2" suppressHydrationWarning>
                  {t('legal.privacy.title')}
               </h1>
               <p className="text-slate-400 text-lg" suppressHydrationWarning>
                  {t('legal.terms.last_updated')}: 2026-01-31
               </p>
            </div>

            {/* Content Card */}
            <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
               <article className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
                  <h2 suppressHydrationWarning>{t('legal.privacy.sections.overview.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.privacy.sections.overview.content')}</p>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.privacy.sections.collection.title')}</h2>

                  <h3 suppressHydrationWarning>{t('legal.privacy.sections.collection.payment_title')}</h3>
                  <p suppressHydrationWarning>{t('legal.privacy.sections.collection.payment_content')}</p>

                  <h3 suppressHydrationWarning>{t('legal.privacy.sections.collection.license_title')}</h3>
                  <ul>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.collection.license_items.0')}</li>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.collection.license_items.1')}</li>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.collection.license_items.2')}</li>
                  </ul>

                  <h3 suppressHydrationWarning>{t('legal.privacy.sections.collection.app_title')}</h3>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 not-prose mb-6">
                     <p className="text-blue-200 font-medium flex items-center gap-2" suppressHydrationWarning>
                        <span className="text-2xl">🛡️</span> {t('legal.privacy.sections.collection.app_content')}
                     </p>
                  </div>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.privacy.sections.usage.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.privacy.sections.usage.content')}</p>
                  <ul>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.usage.items.0')}</li>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.usage.items.1')}</li>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.usage.items.2')}</li>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.usage.items.3')}</li>
                  </ul>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.privacy.sections.sharing.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.privacy.sections.sharing.content')}</p>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.privacy.sections.security.title')}</h2>
                  <ul>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.security.items.0')}</li>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.security.items.1')}</li>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.security.items.2')}</li>
                  </ul>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.privacy.sections.rights.title')}</h2>
                  <ul>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.rights.items.0')}</li>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.rights.items.1')}</li>
                     <li suppressHydrationWarning>{t('legal.privacy.sections.rights.items.2')}</li>
                  </ul>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.privacy.sections.contact.title')}</h2>
                  <p suppressHydrationWarning>
                     {t('legal.privacy.sections.contact.content')}
                     <a href="mailto:me@hjm79.top" className="block mt-2 text-xl font-bold no-underline hover:underline">me@hjm79.top</a>
                  </p>
               </article>
            </div>
         </div>
      </div>
   )
}
