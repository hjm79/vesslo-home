"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { Suspense } from "react";

const NAV_ITEMS = [
   { name: "home", path: "/" },
   { name: "vesslo", path: "/vesslo" },
   { name: "keyharbor", path: "/keyharbor" },
   { name: "splitswipe", path: "/splitswipe" },
   { name: "pricing", path: "/pricing" },
   { name: "gallery", path: "/gallery" },
];

// Inner component that uses useSearchParams
function NavbarContent() {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const router = useRouter();
   const { t, i18n } = useTranslation();

   const currentLang = searchParams.get('lng') || (i18n.language?.startsWith('ko') ? 'ko' : 'en');

   const toggleLanguage = () => {
      const newLang = currentLang === 'ko' ? 'en' : 'ko';
      i18n.changeLanguage(newLang);

      // Update URL with new language parameter
      const params = new URLSearchParams(searchParams.toString());
      params.set('lng', newLang);
      router.push(`${pathname}?${params.toString()}`);
   };

   return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/10">
         <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
               {NAV_ITEMS.map((item) => (
                  <Link
                     key={item.path}
                     href={`${item.path}?lng=${currentLang}`}
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
            <div className="flex items-center gap-4">
               <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-white hover:bg-white/10 transition-colors uppercase"
                  suppressHydrationWarning
               >
                  {currentLang === 'en' ? 'KO' : 'EN'}
               </button>
            </div>
         </div>
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
