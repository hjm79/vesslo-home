"use client";

import { useTranslation } from "react-i18next";
import "@/i18n";

export default function RefundPage() {
   const { t } = useTranslation();

   return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
         {/* Background Elements - Green tint for Refund/Money */}
         <div className="absolute top-0 left-0 w-[1000px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

         <div className="container mx-auto px-4 py-32 relative z-10">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2" suppressHydrationWarning>
                  {t('legal.refund.title')}
               </h1>
               <p className="text-slate-400 text-lg" suppressHydrationWarning>
                  {t('legal.terms.last_updated')}: 2026-01-31
               </p>
            </div>

            {/* Content Card */}
            <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
               <article className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">

                  <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/10 mb-12">
                     <span className="text-4xl mb-4 block">🤝</span>
                     <h2 className="text-3xl font-bold text-white mb-4 mt-0" suppressHydrationWarning>{t('legal.refund.guarantee')}</h2>
                     <p className="text-xl text-slate-300" suppressHydrationWarning>{t('legal.refund.guarantee_desc')}</p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 not-prose mb-8">
                     <h3 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-2" suppressHydrationWarning>
                        <span>💡</span> {t('legal.refund.trial_tip')}
                     </h3>
                     <p className="text-slate-300" suppressHydrationWarning>{t('legal.refund.trial_tip_desc')}</p>
                  </div>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.refund.payment_info')}</h2>
                  <p suppressHydrationWarning>{t('legal.refund.payment_info_desc')}</p>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.refund.how_to')}</h2>

                  <h3 suppressHydrationWarning>{t('legal.refund.method1_title')}</h3>
                  <p suppressHydrationWarning>{t('legal.refund.method1_desc')}</p>

                  <h3 suppressHydrationWarning>{t('legal.refund.method2_title')}</h3>
                  <p suppressHydrationWarning>{t('legal.refund.method2_desc')}</p>
                  <ul>
                     <li suppressHydrationWarning>{t('legal.refund.method2_items.0')}</li>
                     <li suppressHydrationWarning>{t('legal.refund.method2_items.1')}</li>
                     <li suppressHydrationWarning>{t('legal.refund.method2_items.2')}</li>
                  </ul>

                  <div className="my-8 h-px bg-white/10" />

                  <h2 suppressHydrationWarning>{t('legal.refund.timeline_title')}</h2>
                  <ul>
                     <li suppressHydrationWarning>{t('legal.refund.timeline_items.0')}</li>
                     <li suppressHydrationWarning>{t('legal.refund.timeline_items.1')}</li>
                     <li suppressHydrationWarning>{t('legal.refund.timeline_items.2')}</li>
                  </ul>


               </article>
            </div>
         </div>
      </div>
   )
}
