"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";

// Web3Forms Access Key - Get yours free at https://web3forms.com
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export default function ContactPage() {
   const { t } = useTranslation();
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "general",
      message: ""
   });
   const [submitted, setSubmitted] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
         const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
            },
            body: JSON.stringify({
               access_key: WEB3FORMS_ACCESS_KEY,
               name: formData.name,
               email: formData.email,
               subject: `[Vesslo Contact] ${formData.subject} - ${formData.name}`,
               message: formData.message,
               from_name: "Vesslo Contact Form",
            }),
         });

         const result = await response.json();

         if (result.success) {
            setSubmitted(true);
            setFormData({ name: "", email: "", subject: "general", message: "" });
         } else {
            setError("Failed to send message. Please try again.");
         }
      } catch {
         setError("Network error. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
         {/* Background Elements - Blue/Purple mix */}
         <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

         <div className="container mx-auto px-4 py-32 relative z-10">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2" suppressHydrationWarning>
                  {t('legal.contact.title')}
               </h1>
               <p className="text-slate-400 text-lg" suppressHydrationWarning>
                  {t('legal.contact.subtitle')}
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
               {/* Contact Form Card */}
               <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6" suppressHydrationWarning>{t('legal.contact.form_title')}</h2>

                  {submitted ? (
                     <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                        <div className="text-6xl mb-6">✉️</div>
                        <h3 className="text-2xl font-bold text-white mb-3" suppressHydrationWarning>{t('legal.contact.success_title')}</h3>
                        <p className="text-slate-400 text-lg mb-8" suppressHydrationWarning>{t('legal.contact.success_desc')}</p>
                        <button
                           onClick={() => setSubmitted(false)}
                           className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-all"
                           suppressHydrationWarning
                        >
                           {t('legal.contact.new_message')}
                        </button>
                     </div>
                  ) : (
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-2" suppressHydrationWarning>{t('legal.contact.name')}</label>
                           <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:bg-black/50 focus:outline-none transition-all"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-2" suppressHydrationWarning>{t('legal.contact.email')}</label>
                           <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:bg-black/50 focus:outline-none transition-all"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-2" suppressHydrationWarning>{t('legal.contact.subject')}</label>
                           <select
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:bg-black/50 focus:outline-none transition-all appearance-none"
                           >
                              <option value="general" suppressHydrationWarning>{t('legal.contact.subject_options.general')}</option>
                              <option value="support" suppressHydrationWarning>{t('legal.contact.subject_options.support')}</option>
                              <option value="refund" suppressHydrationWarning>{t('legal.contact.subject_options.refund')}</option>
                              <option value="license" suppressHydrationWarning>{t('legal.contact.subject_options.license')}</option>
                              <option value="partnership" suppressHydrationWarning>{t('legal.contact.subject_options.partnership')}</option>
                           </select>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-2" suppressHydrationWarning>{t('legal.contact.message')}</label>
                           <textarea
                              required
                              rows={5}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:bg-black/50 focus:outline-none transition-all resize-none"
                              placeholder={t('legal.contact.message_placeholder') as string}
                           />
                        </div>

                        {error && (
                           <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                              {error}
                           </div>
                        )}

                        <button
                           type="submit"
                           disabled={isLoading}
                           className="w-full py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-slate-200 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                           suppressHydrationWarning
                        >
                           {isLoading ? t('legal.contact.sending') : t('legal.contact.submit')}
                        </button>
                     </form>
                  )}
               </div>

               {/* Info Card */}
               <div className="space-y-6">
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl h-fit">
                     <h2 className="text-2xl font-bold text-white mb-8" suppressHydrationWarning>{t('legal.contact.info_title')}</h2>

                     <div className="space-y-8">
                        <div className="flex items-start gap-5">
                           <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-2xl">
                              📧
                           </div>
                           <div>
                              <h3 className="font-bold text-white text-lg mb-1" suppressHydrationWarning>{t('legal.contact.info_email')}</h3>
                              <a href="mailto:me@hjm79.top" className="text-blue-400 hover:text-blue-300 text-lg transition-colors">
                                 me@hjm79.top
                              </a>
                           </div>
                        </div>

                        <div className="flex items-start gap-5">
                           <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-2xl">
                              ⏰
                           </div>
                           <div>
                              <h3 className="font-bold text-white text-lg mb-1" suppressHydrationWarning>{t('legal.contact.info_response')}</h3>
                              <p className="text-slate-400" suppressHydrationWarning>{t('legal.contact.info_response_value')}</p>
                           </div>
                        </div>

                        <div className="flex items-start gap-5">
                           <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 text-2xl">
                              🌏
                           </div>
                           <div>
                              <h3 className="font-bold text-white text-lg mb-1" suppressHydrationWarning>{t('legal.contact.info_language')}</h3>
                              <p className="text-slate-400" suppressHydrationWarning>{t('legal.contact.info_language_value')}</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                     <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2" suppressHydrationWarning>
                        <span>💡</span> {t('legal.contact.quick_help')}
                     </h3>
                     <p className="text-slate-300 mb-6 leading-relaxed" suppressHydrationWarning>
                        {t('legal.contact.quick_help_desc')}
                     </p>
                     <a
                        href="https://paddle.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all font-medium"
                        suppressHydrationWarning
                     >
                        {t('legal.contact.paddle_support')} →
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
