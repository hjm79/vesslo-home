"use client";

import { useTranslation } from "react-i18next";
import "@/i18n";

export default function TermsPage() {
   const { t } = useTranslation();

   return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

         <div className="container mx-auto px-4 py-32 relative z-10">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2" suppressHydrationWarning>
                  {t('legal.terms.title')}
               </h1>
               <p className="text-slate-400 text-lg" suppressHydrationWarning>
                  {t('legal.terms.last_updated')}: 2026-02-04
               </p>
            </div>

            {/* Content Card */}
            <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
               <article className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">

                  <h2 suppressHydrationWarning>{t('legal.terms.sections.overview.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.terms.sections.overview.content')}</p>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.terms.sections.payment.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.terms.sections.payment.content')}</p>
                  <ul>
                     <li suppressHydrationWarning>{t('legal.terms.sections.payment.items.0')}</li>
                     <li suppressHydrationWarning>{t('legal.terms.sections.payment.items.1')}</li>
                  </ul>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.terms.sections.license.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.terms.sections.license.content')}</p>
                  <ul>
                     <li suppressHydrationWarning>{t('legal.terms.sections.license.items.0')}</li>
                     <li suppressHydrationWarning>{t('legal.terms.sections.license.items.1')}</li>
                     <li suppressHydrationWarning>{t('legal.terms.sections.license.items.2')}</li>
                  </ul>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.terms.sections.restrictions.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.terms.sections.restrictions.content')}</p>
                  <ul>
                     <li suppressHydrationWarning>{t('legal.terms.sections.restrictions.items.0')}</li>
                     <li suppressHydrationWarning>{t('legal.terms.sections.restrictions.items.1')}</li>
                     <li suppressHydrationWarning>{t('legal.terms.sections.restrictions.items.2')}</li>
                     <li suppressHydrationWarning>{t('legal.terms.sections.restrictions.items.3')}</li>
                  </ul>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.terms.sections.ip.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.terms.sections.ip.content')}</p>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.terms.sections.disclaimer.title')}</h2>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 not-prose text-slate-300 text-base leading-relaxed">
                     <p className="font-bold text-red-400 mb-2" suppressHydrationWarning>⚠️ {t('legal.terms.sections.disclaimer.title')}</p>
                     <p suppressHydrationWarning>{t('legal.terms.sections.disclaimer.content')}</p>
                     <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li suppressHydrationWarning>{t('legal.terms.sections.disclaimer.items.0')}</li>
                        <li suppressHydrationWarning>{t('legal.terms.sections.disclaimer.items.1')}</li>
                        <li suppressHydrationWarning>{t('legal.terms.sections.disclaimer.items.2')}</li>
                     </ul>
                  </div>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.terms.sections.changes.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.terms.sections.changes.content')}</p>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.terms.sections.law.title')}</h2>
                  <p suppressHydrationWarning>{t('legal.terms.sections.law.content')}</p>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.terms.sections.contact.title')}</h2>
                  <p suppressHydrationWarning>
                     {t('legal.terms.sections.contact.content')}
                     <a href="mailto:me@hjm79.top" className="block mt-2 text-xl font-bold no-underline hover:underline">me@hjm79.top</a>
                  </p>

                  <div className="my-8 h-px bg-white/10" />

                  <p className="text-slate-400" suppressHydrationWarning>
                     {t('legal.terms.sections.contact.see_also')}{' '}
                     <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
                     {' | '}
                     <a href="/refund" className="text-blue-400 hover:underline">Refund Policy</a>
                  </p>
               </article>
            </div>
         </div>
      </div>
   )
}
