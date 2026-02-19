"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { Suspense, useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
   { name: "home", path: "/" },
   { name: "vesslo", path: "/vesslo" },
   { name: "keyharbor", path: "/keyharbor" },
   { name: "splitswipe", path: "/splitswipe" },
   { name: "harbordrop", path: "/harbordrop" },
   { name: "pricing", path: "/pricing" },
   { name: "gallery", path: "/gallery" },
];

const LANGUAGES = [
   { code: "ko", label: "KO", name: "한국어" },
   { code: "en", label: "EN", name: "English" },
   { code: "es", label: "ES", name: "Español" },
];

// Inner component that uses useSearchParams
function NavbarContent() {
   const pathname = usePathname();
   const { i18n } = useTranslation();
   const [mobileOpen, setMobileOpen] = useState(false);
   const [langOpen, setLangOpen] = useState(false);
   const langRef = useRef<HTMLDivElement>(null);

   const lang = i18n.language || 'en';
   const currentLang = lang.startsWith('ko') ? 'ko' : lang.startsWith('es') ? 'es' : 'en';
   const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[1];

   // Close dropdown when clicking outside
   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (langRef.current && !langRef.current.contains(e.target as Node)) {
            setLangOpen(false);
         }
      };
      if (langOpen) {
         document.addEventListener("mousedown", handleClickOutside);
      }
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [langOpen]);

   const selectLanguage = (code: string) => {
      i18n.changeLanguage(code);
      setLangOpen(false);
   };

   return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
         <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
               {NAV_ITEMS.map((item) => (
                  <Link
                     key={item.path}
                     href={item.path}
                     className={cn(
                        "text-sm font-medium transition-colors text-white/70 hover:text-white capitalize",
                        pathname === item.path ? "text-white font-bold" : ""
                     )}
                     suppressHydrationWarning
                  >
                     {item.name}
                  </Link>
               ))}
            </div>

            {/* Mobile: hamburger */}
            <div className="flex md:hidden items-center gap-3">
               <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="text-white p-1"
                  aria-label="Toggle menu"
               >
                  {mobileOpen ? (
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  ) : (
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                     </svg>
                  )}
               </button>
            </div>

            {/* Language dropdown — always visible */}
            <div className="relative" ref={langRef}>
               <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  suppressHydrationWarning
               >
                  {/* Translate icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                     <path d="M5 8l6 6" /><path d="M4 14l6-6 2-3" /><path d="M2 5h12" /><path d="M7 2v3" />
                     <path d="M22 22l-5-10-5 10" /><path d="M14 18h6" />
                  </svg>
                  <span suppressHydrationWarning>{currentLangObj.name}</span>
               </button>

               {/* Dropdown */}
               {langOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/15 bg-[#1a1a2e]/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                     {LANGUAGES.map((l) => (
                        <button
                           key={l.code}
                           onClick={() => selectLanguage(l.code)}
                           className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/10",
                              currentLang === l.code ? "bg-white/5 text-white" : "text-white/70"
                           )}
                        >
                           <span className="inline-flex items-center justify-center w-8 h-5 rounded text-[10px] font-bold tracking-wider bg-white/15 text-white/90 uppercase shrink-0">
                              {l.label}
                           </span>
                           <span className="flex-1 text-left">{l.name}</span>
                           {currentLang === l.code && (
                              <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                           )}
                        </button>
                     ))}
                  </div>
               )}
            </div>
         </div>

         {/* Mobile dropdown */}
         {mobileOpen && (
            <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-md">
               <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
                  {NAV_ITEMS.map((item) => (
                     <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                           "text-sm font-medium transition-colors text-white/70 hover:text-white capitalize py-1",
                           pathname === item.path ? "text-white font-bold" : ""
                        )}
                        suppressHydrationWarning
                     >
                        {item.name}
                     </Link>
                  ))}
               </div>
            </div>
         )}
      </nav>
   );
}

// Main export wrapped in Suspense for static export compatibility
export default function Navbar() {
   return (
      <Suspense fallback={
         <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
               <div className="flex items-center gap-6">
                  {NAV_ITEMS.map((item) => (
                     <span key={item.path} className="text-sm font-medium text-white/70 capitalize">
                        {item.name}
                     </span>
                  ))}
               </div>
            </div>
         </nav>
      }>
         <NavbarContent />
      </Suspense>
   );
}
