"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";

/* ───────────── Types ───────────── */
interface SectionMeta {
   id: string;
   icon: string;
   titleKey: string; // i18n key within docs.sections.*
}

/* ───────────── Section metadata (for sidebar) ───────────── */
const SECTION_IDS: SectionMeta[] = [
   { id: "intro", icon: "📱", titleKey: "intro" },
   { id: "layout", icon: "🖥️", titleKey: "layout" },
   { id: "views", icon: "👁️", titleKey: "views" },
   { id: "update", icon: "🔄", titleKey: "update" },
   { id: "running", icon: "⚙️", titleKey: "running" },
   { id: "sources", icon: "📦", titleKey: "sources" },
   { id: "manual", icon: "📦", titleKey: "manual" },
   { id: "manage", icon: "🏷️", titleKey: "manage" },
   { id: "search", icon: "🔍", titleKey: "search" },
   { id: "shortcuts", icon: "⌨️", titleKey: "shortcuts" },
   { id: "settings", icon: "🛠️", titleKey: "settings" },
   { id: "faq", icon: "❓", titleKey: "faq" },
   { id: "support", icon: "📞", titleKey: "support" },
];

/* ───────────── Helpers ───────────── */
const IMG = (name: string) => `/vesslo/docs/${name}`;

/* ───────────── Reusable Components ───────────── */
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
   return (
      <div className={`bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 ${className}`}>
         {children}
      </div>
   );
}

function SectionHeader({ icon, title, id }: { icon: string; title: string; id: string }) {
   return (
      <motion.div
         id={id}
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-60px" }}
         transition={{ duration: 0.5 }}
         className="scroll-mt-28 mb-8"
      >
         <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
               {title}
            </h2>
         </div>
         <div className="mt-3 h-px bg-gradient-to-r from-cyan-500/40 via-teal-500/20 to-transparent" />
      </motion.div>
   );
}

function DocImage({ src, alt, caption, onClick }: { src: string; alt: string; caption?: string; onClick: (src: string) => void }) {
   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.97 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true, margin: "-40px" }}
         transition={{ duration: 0.5 }}
         className="group cursor-zoom-in"
         onClick={() => onClick(src)}
      >
         <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
            <img
               src={src}
               alt={alt}
               className="relative w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-500"
               loading="lazy"
            />
            {/* Zoom hint */}
            <div className="absolute bottom-3 right-3 p-2 bg-black/50 rounded-full backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/80">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
               </svg>
            </div>
         </div>
         {caption && (
            <p className="text-center text-sm text-slate-500 mt-2">{caption}</p>
         )}
      </motion.div>
   );
}

function TipCard({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex items-start gap-3 mt-4 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
         <span className="text-lg flex-shrink-0">💡</span>
         <p className="text-sm text-cyan-300/90">{children}</p>
      </div>
   );
}

function StepList({ steps }: { steps: string[] }) {
   return (
      <ol className="space-y-2 mt-3">
         {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
               <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white">
                  {i + 1}
               </span>
               <span className="text-slate-300 text-sm leading-relaxed pt-0.5">{step}</span>
            </li>
         ))}
      </ol>
   );
}

/* ───────────── FAQ Accordion ───────────── */
function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
   const [open, setOpen] = useState(false);
   return (
      <div className="border border-white/10 rounded-xl overflow-hidden">
         <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
         >
            <span className="font-medium text-white">{question}</span>
            <svg
               className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
               fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
               <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
         </button>
         <AnimatePresence>
            {open && (
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
               >
                  <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed">{answer}</div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}

/* ═══════════════════════════════════════════ */
/*                  MAIN PAGE                 */
/* ═══════════════════════════════════════════ */
export default function DocsPage() {
   const { t } = useTranslation();
   const [mounted, setMounted] = useState(false);
   const [activeSection, setActiveSection] = useState("intro");
   const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

   useEffect(() => {
      setMounted(true);
   }, []);

   /* Intersection Observer for active sidebar highlight */
   useEffect(() => {
      if (!mounted) return;

      const observer = new IntersectionObserver(
         (entries) => {
            for (const entry of entries) {
               if (entry.isIntersecting) {
                  setActiveSection(entry.target.id);
               }
            }
         },
         { rootMargin: "-20% 0px -60% 0px" }
      );

      SECTION_IDS.forEach((s) => {
         const el = document.getElementById(s.id);
         if (el) {
            sectionRefs.current.set(s.id, el);
            observer.observe(el);
         }
      });

      return () => observer.disconnect();
   }, [mounted]);

   const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setSidebarOpen(false);
   };

   if (!mounted) {
      return (
         <div className="min-h-screen bg-black text-white">
            <div className="pt-32 pb-16 text-center">
               <h1 className="text-5xl font-bold mb-4">Vesslo {t("docs.hero_title_highlight")}</h1>
               <p className="text-slate-400">{t("docs.hero_subtitle")}</p>
            </div>
         </div>
      );
   }

   const openLightbox = (src: string) => setLightboxSrc(src);

   /* ───── Shortcut helper for t() ───── */
   const d = (key: string) => t(`docs.${key}`);

   return (
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">

         {/* ══════ Hero ══════ */}
         <section className="pt-24 pb-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10 text-center">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 mb-6"
               >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-medium text-cyan-300">{d("badge")}</span>
               </motion.div>

               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-bold mb-4"
               >
                  {d("hero_title_prefix")}{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                     {d("hero_title_highlight")}
                  </span>
               </motion.h1>

               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-400 max-w-xl mx-auto"
               >
                  {d("hero_subtitle")}
               </motion.p>
            </div>
         </section>

         {/* ══════ Mobile Sidebar Toggle ══════ */}
         <div className="lg:hidden sticky top-16 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10 px-4 py-3">
            <button
               onClick={() => setSidebarOpen(!sidebarOpen)}
               className="flex items-center gap-2 text-sm text-cyan-400 font-medium"
            >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
               </svg>
               {d("toc")}
            </button>
            <AnimatePresence>
               {sidebarOpen && (
                  <motion.nav
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: "auto", opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="overflow-hidden mt-2 space-y-1"
                  >
                     {SECTION_IDS.map((s) => (
                        <button
                           key={s.id}
                           onClick={() => scrollTo(s.id)}
                           className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${activeSection === s.id
                                 ? "bg-cyan-500/20 text-cyan-400"
                                 : "text-slate-400 hover:text-white hover:bg-white/5"
                              }`}
                        >
                           <span>{s.icon}</span>
                           <span>{t(`docs.sections.${s.titleKey}`)}</span>
                        </button>
                     ))}
                  </motion.nav>
               )}
            </AnimatePresence>
         </div>

         {/* ══════ Body: Sidebar + Content ══════ */}
         <section className="py-8 relative">
            <div className="container mx-auto px-4 md:px-6">
               <div className="flex gap-8 lg:gap-12">

                  {/* Sidebar – Desktop */}
                  <nav className="hidden lg:block w-56 flex-shrink-0">
                     <div className="sticky top-24 space-y-1">
                        {SECTION_IDS.map((s) => (
                           <button
                              key={s.id}
                              onClick={() => scrollTo(s.id)}
                              className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 text-sm ${activeSection === s.id
                                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                                    : "hover:bg-white/5 text-slate-500 hover:text-slate-300"
                                 }`}
                           >
                              <span className="text-base">{s.icon}</span>
                              <span className="font-medium">{t(`docs.sections.${s.titleKey}`)}</span>
                           </button>
                        ))}
                     </div>
                  </nav>

                  {/* Main Content */}
                  <main className="flex-1 min-w-0 space-y-20 pb-24">

                     {/* ─── 1. Vesslo란? ─── */}
                     <section>
                        <SectionHeader icon="📱" title={t("docs.sections.intro")} id="intro" />
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                           {d("intro.desc_pre")}<strong className="text-white">{d("intro.desc_strong")}</strong>{d("intro.desc_mid")}{d("intro.desc_strong2") && <strong className="text-white">{d("intro.desc_strong2")}</strong>}{d("intro.desc_post")}
                        </p>

                        <h3 className="text-lg font-semibold text-white mb-4">{d("intro.key_features")}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {[
                              { icon: "🔄", titleKey: "intro.feat_unified", descKey: "intro.feat_unified_desc" },
                              { icon: "📂", titleKey: "intro.feat_sort", descKey: "intro.feat_sort_desc" },
                              { icon: "⚡", titleKey: "intro.feat_batch", descKey: "intro.feat_batch_desc" },
                              { icon: "🛡️", titleKey: "intro.feat_running", descKey: "intro.feat_running_desc" },
                           ].map((f) => (
                              <GlassCard key={f.titleKey} className="flex items-start gap-4 hover:border-cyan-500/30 transition-colors">
                                 <span className="text-2xl flex-shrink-0">{f.icon}</span>
                                 <div>
                                    <p className="font-semibold text-white text-sm">{d(f.titleKey)}</p>
                                    <p className="text-slate-400 text-sm mt-1">{d(f.descKey)}</p>
                                 </div>
                              </GlassCard>
                           ))}
                        </div>
                     </section>

                     {/* ─── 2. 화면 구성 ─── */}
                     <section>
                        <SectionHeader icon="🖥️" title={t("docs.sections.layout")} id="layout" />
                        <h3 className="text-lg font-semibold text-white mb-4">{d("layout.main_screen")}</h3>
                        <DocImage src={IMG("vesslo-composition.jpeg")} alt="Vesslo 3-panel" onClick={openLightbox} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                           <GlassCard>
                              <h4 className="font-semibold text-cyan-400 mb-3">{d("layout.panel1_title")}</h4>
                              <ul className="space-y-2 text-sm text-slate-300">
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("layout.panel1_all")}</strong>: {d("layout.panel1_all_desc")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("layout.panel1_update")}</strong>: {d("layout.panel1_update_desc")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("layout.panel1_running")}</strong>: {d("layout.panel1_running_desc")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("layout.panel1_category")}</strong>: {d("layout.panel1_category_desc")}</li>
                              </ul>
                           </GlassCard>
                           <GlassCard>
                              <h4 className="font-semibold text-cyan-400 mb-3">{d("layout.panel23_title")}</h4>
                              <p className="text-sm text-slate-300">{d("layout.panel23_desc")}</p>
                           </GlassCard>
                        </div>
                     </section>

                     {/* ─── 3. 보기 모드 ─── */}
                     <section>
                        <SectionHeader icon="👁️" title={t("docs.sections.views")} id="views" />

                        <h3 className="text-lg font-semibold text-white mb-4">{d("views.general_title")}</h3>
                        <GlassCard className="mb-6">
                           <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                 <thead>
                                    <tr className="text-left border-b border-white/10">
                                       <th className="pb-3 pr-4 text-cyan-400 font-semibold">{d("views.mode")}</th>
                                       <th className="pb-3 text-cyan-400 font-semibold">{d("views.description")}</th>
                                    </tr>
                                 </thead>
                                 <tbody className="text-slate-300">
                                    <tr className="border-b border-white/5">
                                       <td className="py-3 pr-4 font-medium text-white">{d("views.list_view")}</td>
                                       <td className="py-3">{d("views.list_view_desc")}</td>
                                    </tr>
                                    <tr>
                                       <td className="py-3 pr-4 font-medium text-white">{d("views.split_view")}</td>
                                       <td className="py-3">{d("views.split_view_desc")}</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </GlassCard>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                           <DocImage src={IMG("vesslo-listview.jpeg")} alt={d("views.list_caption")} caption={d("views.list_caption")} onClick={openLightbox} />
                           <DocImage src={IMG("vesslo-gridview.jpeg")} alt={d("views.split_caption")} caption={d("views.split_caption")} onClick={openLightbox} />
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-4">{d("views.update_title")}</h3>
                        <GlassCard className="mb-6">
                           <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                 <thead>
                                    <tr className="text-left border-b border-white/10">
                                       <th className="pb-3 pr-4 text-cyan-400 font-semibold">{d("views.mode")}</th>
                                       <th className="pb-3 text-cyan-400 font-semibold">{d("views.description")}</th>
                                    </tr>
                                 </thead>
                                 <tbody className="text-slate-300">
                                    <tr className="border-b border-white/5">
                                       <td className="py-3 pr-4 font-medium text-white">{d("views.grid_view")}</td>
                                       <td className="py-3">{d("views.grid_view_desc")}</td>
                                    </tr>
                                    <tr>
                                       <td className="py-3 pr-4 font-medium text-white">{d("views.list_view")}</td>
                                       <td className="py-3">{d("views.list_update_desc")}</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </GlassCard>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <DocImage src={IMG("vesslo-updates-gridview.jpeg")} alt={d("views.grid_caption")} caption={d("views.grid_caption")} onClick={openLightbox} />
                           <DocImage src={IMG("vesslo-updates-listview.jpeg")} alt={d("views.list_update_caption")} caption={d("views.list_update_caption")} onClick={openLightbox} />
                        </div>
                     </section>

                     {/* ─── 4. 업데이트 기능 ─── */}
                     <section>
                        <SectionHeader icon="🔄" title={t("docs.sections.update")} id="update" />

                        <div className="space-y-10">
                           {/* 개별 업데이트 */}
                           <div>
                              <h3 className="text-lg font-semibold text-white mb-3">{d("update.individual")}</h3>
                              <StepList steps={t("docs.update.individual_steps", { returnObjects: true }) as string[]} />
                              <div className="mt-4 max-w-md">
                                 <DocImage src={IMG("vesslo-detail-update.jpeg")} alt={d("update.individual")} onClick={openLightbox} />
                              </div>
                           </div>

                           {/* 모두 업데이트 */}
                           <div>
                              <h3 className="text-lg font-semibold text-white mb-3">{d("update.batch")}</h3>
                              <StepList steps={t("docs.update.batch_steps", { returnObjects: true }) as string[]} />
                              <div className="mt-4">
                                 <DocImage src={IMG("vesslo-updates-udate_all.png")} alt={d("update.batch")} onClick={openLightbox} />
                              </div>
                           </div>

                           {/* 카테고리별 */}
                           <div>
                              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                 {d("update.category")}
                                 <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-400">{d("update.category_new")}</span>
                              </h3>
                              <StepList steps={t("docs.update.category_steps", { returnObjects: true }) as string[]} />
                              <div className="mt-4">
                                 <DocImage src={IMG("vesslo-updates-category.jpeg")} alt={d("update.category")} onClick={openLightbox} />
                              </div>
                              <TipCard>{d("update.category_tip")}</TipCard>
                           </div>
                        </div>
                     </section>

                     {/* ─── 5. 실행 중 앱 처리 ─── */}
                     <section>
                        <SectionHeader icon="⚙️" title={d("running.title")} id="running" />
                        <p className="text-slate-400 text-sm mb-4">{d("running.path")}</p>

                        <GlassCard className="mb-6">
                           <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                 <thead>
                                    <tr className="text-left border-b border-white/10">
                                       <th className="pb-3 pr-4 text-cyan-400 font-semibold">{d("running.option")}</th>
                                       <th className="pb-3 text-cyan-400 font-semibold">{d("running.behavior")}</th>
                                    </tr>
                                 </thead>
                                 <tbody className="text-slate-300">
                                    <tr className="border-b border-white/5">
                                       <td className="py-3 pr-4 font-medium text-green-400">{d("running.safe")}</td>
                                       <td className="py-3">{d("running.safe_desc")}</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                       <td className="py-3 pr-4 font-medium text-orange-400">{d("running.force")}</td>
                                       <td className="py-3">{d("running.force_desc")}</td>
                                    </tr>
                                    <tr>
                                       <td className="py-3 pr-4 font-medium text-slate-400">{d("running.skip")}</td>
                                       <td className="py-3">{d("running.skip_desc")}</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </GlassCard>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <DocImage src={IMG("vesslo-setting-updates.png")} alt={d("running.caption_settings")} caption={d("running.caption_settings")} onClick={openLightbox} />
                           <DocImage src={IMG("vesslo-safe.png")} alt={d("running.caption_safe")} caption={d("running.caption_safe")} onClick={openLightbox} />
                        </div>
                     </section>

                     {/* ─── 6. 업데이트 소스 ─── */}
                     <section>
                        <SectionHeader icon="📦" title={t("docs.sections.sources")} id="sources" />
                        <p className="text-slate-400 mb-6">{d("sources.desc")}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                           {[
                              { name: "Homebrew", color: "from-orange-500 to-amber-500", border: "border-orange-500/30", text: "text-orange-400", descKey: "sources.homebrew_desc", badge: "🟠" },
                              { name: "Sparkle", color: "from-purple-500 to-violet-500", border: "border-purple-500/30", text: "text-purple-400", descKey: "sources.sparkle_desc", badge: "🟣" },
                              { name: "App Store", color: "from-blue-500 to-cyan-500", border: "border-blue-500/30", text: "text-blue-400", descKey: "sources.appstore_desc", badge: "🔵" },
                              { name: "Setapp", color: "from-green-500 to-emerald-500", border: "border-green-500/30", text: "text-green-400", descKey: "sources.setapp_desc", badge: "🟢" },
                              { name: "Manual", color: "from-slate-500 to-slate-400", border: "border-slate-500/30", text: "text-slate-400", descKey: "sources.manual_desc", badge: "⚪" },
                           ].map((s) => (
                              <GlassCard key={s.name} className={`${s.border} hover:scale-[1.02] transition-transform`}>
                                 <div className="flex items-center gap-3 mb-2">
                                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-xs font-bold text-white`}>
                                       {s.badge}
                                    </span>
                                    <span className={`font-semibold ${s.text}`}>{s.name}</span>
                                 </div>
                                 <p className="text-xs text-slate-400">{d(s.descKey)}</p>
                              </GlassCard>
                           ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                           <DocImage src={IMG("vesslo-sparkle-adoptable.png")} alt="Sparkle & Adoptable" caption="Sparkle & Adoptable" onClick={openLightbox} />
                           <DocImage src={IMG("vesslo-brew.png")} alt="Homebrew" caption="Homebrew" onClick={openLightbox} />
                           <DocImage src={IMG("vesslo-appstore-running.png")} alt="App Store" caption="App Store" onClick={openLightbox} />
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-4">{d("sources.badge_title")}</h3>
                        <p className="text-slate-400 text-sm mb-4">{d("sources.badge_desc")}</p>

                        <GlassCard className="mb-6">
                           <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                 <thead>
                                    <tr className="text-left border-b border-white/10">
                                       <th className="pb-3 pr-4 text-cyan-400 font-semibold">{d("sources.badge_icon")}</th>
                                       <th className="pb-3 text-cyan-400 font-semibold">{d("sources.badge_meaning")}</th>
                                    </tr>
                                 </thead>
                                 <tbody className="text-slate-300">
                                    <tr className="border-b border-white/5">
                                       <td className="py-3 pr-4 text-lg">🔒</td>
                                       <td className="py-3">{d("sources.badge_sudo")}</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                       <td className="py-3 pr-4 text-lg">📦</td>
                                       <td className="py-3"><strong>{d("sources.badge_manual")}</strong></td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                       <td className="py-3 pr-4 text-lg">🔄📦</td>
                                       <td className="py-3">{d("sources.badge_adoptable")}</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                       <td className="py-3 pr-4 font-medium text-blue-400">iOS</td>
                                       <td className="py-3">{d("sources.badge_ios")}</td>
                                    </tr>
                                    <tr>
                                       <td className="py-3 pr-4 font-medium text-slate-400">Electron</td>
                                       <td className="py-3">{d("sources.badge_electron")}</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </GlassCard>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <DocImage src={IMG("vesslo-sudo-box.png")} alt={d("sources.badge_sudo_caption")} caption={d("sources.badge_sudo_caption")} onClick={openLightbox} />
                           <DocImage src={IMG("vesslo-ios.png")} alt={d("sources.badge_ios_caption")} caption={d("sources.badge_ios_caption")} onClick={openLightbox} />
                        </div>
                     </section>

                     {/* ─── 7. 수동 설치 앱 ─── */}
                     <section>
                        <SectionHeader icon="📦" title={d("manual.title")} id="manual" />
                        <GlassCard className="border-orange-500/20 mb-6">
                           <p className="text-slate-300 leading-relaxed">
                              {d("manual.desc1_pre")}<strong className="text-orange-400">{d("manual.desc1_highlight")}</strong>{d("manual.desc1_post")}
                              {" "}{d("manual.desc2_pre")}<code className="text-xs px-1.5 py-0.5 bg-white/10 rounded text-orange-300">brew upgrade --cask</code>{d("manual.desc2_post")}
                              <strong className="text-red-400">{d("manual.desc2_cannot")}</strong>{d("manual.desc2_post")}
                           </p>
                           <div className="mt-3 text-sm text-slate-400">
                              <strong className="text-white">{d("manual.example_title")}</strong> {d("manual.example_list")}
                           </div>
                           <div className="mt-3 text-sm text-slate-400">
                              <strong className="text-white">{d("manual.how_title")}</strong>
                              <ul className="mt-1 space-y-1">
                                 <li>• {d("manual.how1")}</li>
                                 <li>• {d("manual.how2_pre")}<code className="text-xs px-1.5 py-0.5 bg-white/10 rounded">brew fetch --cask</code>{d("manual.how2_post")}</li>
                              </ul>
                           </div>
                        </GlassCard>

                        <div className="max-w-lg mb-8">
                           <DocImage src={IMG("vesslo-loupedeck.jpeg")} alt={d("manual.caption_loupedeck")} caption={d("manual.caption_loupedeck")} onClick={openLightbox} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <GlassCard>
                              <h4 className="font-semibold text-cyan-400 mb-3">{d("manual.individual")}</h4>
                              <StepList steps={t("docs.manual.individual_steps", { returnObjects: true }) as string[]} />
                           </GlassCard>
                           <GlassCard>
                              <h4 className="font-semibold text-cyan-400 mb-3">{d("manual.batch")}</h4>
                              <StepList steps={t("docs.manual.batch_steps", { returnObjects: true }) as string[]} />
                           </GlassCard>
                        </div>

                        <TipCard>
                           <strong>{d("manual.tip_prefix")}</strong>{d("manual.tip_sudo")}<code className="text-xs px-1 py-0.5 bg-white/10 rounded">brew upgrade</code>{d("manual.tip_manual")}<code className="text-xs px-1 py-0.5 bg-white/10 rounded">brew fetch</code>{d("manual.tip_suffix")}
                        </TipCard>
                     </section>

                     {/* ─── 8. 앱 관리 기능 ─── */}
                     <section>
                        <SectionHeader icon="🏷️" title={t("docs.sections.manage")} id="manage" />

                        <div className="space-y-8">
                           <div>
                              <h3 className="text-lg font-semibold text-white mb-3">{d("manage.skip_title")}</h3>
                              <ul className="space-y-2 text-sm text-slate-300">
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("manage.skip_version")}</strong>: {d("manage.skip_version_desc")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("manage.skip_app")}</strong>: {d("manage.skip_app_desc")}</li>
                              </ul>
                              <div className="mt-4 max-w-md">
                                 <DocImage src={IMG("vesslo-update-skip.png")} alt={d("manage.skip_title")} onClick={openLightbox} />
                              </div>
                           </div>

                           <div>
                              <h3 className="text-lg font-semibold text-white mb-3">{d("manage.tag_title")}</h3>
                              <ul className="space-y-2 text-sm text-slate-300">
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> {d("manage.tag_add")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> {d("manage.tag_filter")}</li>
                              </ul>
                              <div className="mt-4 max-w-md">
                                 <DocImage src={IMG("vesslo-tag.png")} alt={d("manage.tag_title")} onClick={openLightbox} />
                              </div>
                           </div>

                           <div>
                              <h3 className="text-lg font-semibold text-white mb-3">{d("manage.memo_title")}</h3>
                              <ul className="space-y-2 text-sm text-slate-300">
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> {d("manage.memo_markdown")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> {d("manage.memo_license")}</li>
                              </ul>
                              <div className="mt-4 max-w-md">
                                 <DocImage src={IMG("vessl-memo.jpeg")} alt={d("manage.memo_title")} onClick={openLightbox} />
                              </div>
                           </div>
                        </div>
                     </section>

                     {/* ─── 9. 검색 및 필터 ─── */}
                     <section>
                        <SectionHeader icon="🔍" title={t("docs.sections.search")} id="search" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <GlassCard>
                              <h4 className="font-semibold text-cyan-400 mb-3">{d("search.search_title")}</h4>
                              <ul className="space-y-2 text-sm text-slate-300">
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> {d("search.search_name")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> {d("search.search_enter")}</li>
                              </ul>
                           </GlassCard>
                           <GlassCard>
                              <h4 className="font-semibold text-cyan-400 mb-3">{d("search.filter_title")}</h4>
                              <ul className="space-y-2 text-sm text-slate-300">
                                 <li className="flex items-center gap-2"><span className="text-orange-400">•</span> <strong>{d("search.filter_source")}</strong>: {d("search.filter_source_desc")}</li>
                                 <li className="flex items-center gap-2"><span className="text-purple-400">•</span> <strong>{d("search.filter_category")}</strong>: {d("search.filter_category_desc")}</li>
                                 <li className="flex items-center gap-2"><span className="text-blue-400">•</span> <strong>{d("search.filter_status")}</strong>: {d("search.filter_status_desc")}</li>
                              </ul>
                           </GlassCard>
                        </div>
                     </section>

                     {/* ─── 10. 단축키 ─── */}
                     <section>
                        <SectionHeader icon="⌨️" title={t("docs.sections.shortcuts")} id="shortcuts" />
                        <GlassCard>
                           <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                 <thead>
                                    <tr className="text-left border-b border-white/10">
                                       <th className="pb-3 pr-4 text-cyan-400 font-semibold">{d("shortcuts.shortcut")}</th>
                                       <th className="pb-3 text-cyan-400 font-semibold">{d("shortcuts.function")}</th>
                                    </tr>
                                 </thead>
                                 <tbody className="text-slate-300">
                                    {(t("docs.shortcuts.items", { returnObjects: true }) as string[][]).map(([key, desc]) => (
                                       <tr key={key} className="border-b border-white/5 last:border-0">
                                          <td className="py-3 pr-4">
                                             <kbd className="px-2.5 py-1 bg-slate-800 border border-slate-600 rounded-lg text-xs font-mono text-white shadow-sm">{key}</kbd>
                                          </td>
                                          <td className="py-3">{desc}</td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </GlassCard>
                     </section>

                     {/* ─── 11. 설정 ─── */}
                     <section>
                        <SectionHeader icon="🛠️" title={t("docs.sections.settings")} id="settings" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <GlassCard>
                              <h4 className="font-semibold text-cyan-400 mb-3">{d("settings.general")}</h4>
                              <ul className="space-y-2 text-sm text-slate-300">
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("settings.language")}</strong>: {d("settings.language_desc")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("settings.startup")}</strong>: {d("settings.startup_desc")}</li>
                              </ul>
                           </GlassCard>
                           <GlassCard>
                              <h4 className="font-semibold text-cyan-400 mb-3">{d("settings.updates")}</h4>
                              <ul className="space-y-2 text-sm text-slate-300">
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("settings.interval")}</strong>: {d("settings.interval_desc")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> <strong>{d("settings.quit_method")}</strong>: {d("settings.quit_method_desc")}</li>
                              </ul>
                           </GlassCard>
                           <GlassCard>
                              <h4 className="font-semibold text-cyan-400 mb-3">{d("settings.discovery")}</h4>
                              <ul className="space-y-2 text-sm text-slate-300">
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> {d("settings.homebrew_search")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> {d("settings.sparkle_search")}</li>
                                 <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> {d("settings.appstore_search")}</li>
                              </ul>
                           </GlassCard>
                        </div>
                     </section>

                     {/* ─── 12. FAQ ─── */}
                     <section>
                        <SectionHeader icon="❓" title={t("docs.sections.faq")} id="faq" />
                        <div className="space-y-3">
                           <FAQItem
                              question={d("faq.q1")}
                              answer={
                                 <ol className="space-y-1.5 list-decimal list-inside">
                                    <li>{d("faq.a1_step1_pre")}<kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-600 rounded text-xs font-mono">⌘ + R</kbd></li>
                                    <li>{d("faq.a1_step2")}</li>
                                    <li>{d("faq.a1_step3")}</li>
                                 </ol>
                              }
                           />
                           <FAQItem
                              question={d("faq.q2")}
                              answer={
                                 <div>
                                    <p className="mb-2">{d("faq.a2_desc")}</p>
                                    <ul className="space-y-1">
                                       <li>• <strong>{d("faq.a2_lock")}</strong>: <code className="text-xs px-1 py-0.5 bg-white/10 rounded">{d("faq.a2_lock_cmd")}</code>{d("faq.a2_lock_desc")}</li>
                                       <li>• <strong>{d("faq.a2_box")}</strong>: <code className="text-xs px-1 py-0.5 bg-white/10 rounded">{d("faq.a2_box_cmd")}</code>{d("faq.a2_box_desc")}</li>
                                    </ul>
                                 </div>
                              }
                           />
                           <FAQItem
                              question={d("faq.q3")}
                              answer={
                                 <p>
                                    <code className="text-xs px-1 py-0.5 bg-white/10 rounded">{d("faq.a3_type")}</code>
                                    {d("faq.a3_desc1")}<code className="text-xs px-1 py-0.5 bg-white/10 rounded">{d("faq.a3_cmd1")}</code>
                                    {d("faq.a3_desc2")}<code className="text-xs px-1 py-0.5 bg-white/10 rounded">{d("faq.a3_cmd2")}</code>
                                    {d("faq.a3_desc3")}
                                 </p>
                              }
                           />
                           <FAQItem
                              question={d("faq.q4")}
                              answer={
                                 <ul className="space-y-1">
                                    <li>• <code className="text-xs px-1 py-0.5 bg-white/10 rounded">mas</code>{d("faq.a4_mas_post")}</li>
                                    <li>• <code className="text-xs px-1 py-0.5 bg-white/10 rounded">mas upgrade</code>{d("faq.a4_password_post")}</li>
                                    <li>• {d("faq.a4_batch")}</li>
                                 </ul>
                              }
                           />
                        </div>
                     </section>

                     {/* ─── 13. 지원 ─── */}
                     <section>
                        <SectionHeader icon="📞" title={t("docs.sections.support")} id="support" />
                        <GlassCard className="text-center">
                           <div className="space-y-4">
                              <div className="flex items-center justify-center gap-3">
                                 <span className="text-2xl">🌐</span>
                                 <a href="https://vesslo.top/vesslo" target="_blank" rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
                                    vesslo.top/vesslo
                                 </a>
                              </div>
                              <div className="flex items-center justify-center gap-3">
                                 <span className="text-2xl">📧</span>
                                 <a href="mailto:me@hjm79.top"
                                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
                                    me@hjm79.top
                                 </a>
                              </div>
                           </div>
                           <div className="mt-6 pt-6 border-t border-white/10">
                              <p className="text-slate-500 text-sm italic">{d("tagline")}</p>
                           </div>
                        </GlassCard>
                     </section>

                  </main>
               </div>
            </div>
         </section>

         {/* ══════ Back to Vesslo CTA ══════ */}
         <section className="py-16 text-center border-t border-white/5">
            <div className="container mx-auto px-6">
               <a
                  href="/vesslo"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors"
               >
                  {d("back_to_vesslo")}
               </a>
            </div>
         </section>

         {/* ══════ Lightbox Modal ══════ */}
         <AnimatePresence>
            {lightboxSrc && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 cursor-zoom-out backdrop-blur-sm"
                  onClick={() => setLightboxSrc(null)}
               >
                  <motion.img
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.9, opacity: 0 }}
                     transition={{ type: "spring", damping: 25, stiffness: 300 }}
                     src={lightboxSrc}
                     alt="Fullscreen view"
                     className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
                  />
                  <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
