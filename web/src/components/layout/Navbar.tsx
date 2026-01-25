"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
   { name: "Home", path: "/" },
   { name: "Vesslo", path: "/vesslo" },
   { name: "KeyHarbor", path: "/keyharbor" },
   { name: "SplitSwipe", path: "/splitswipe" },
   { name: "Gallery", path: "/gallery" },
];

export default function Navbar() {
   const pathname = usePathname();

   return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
         <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
               {/* Logo area could go here */}
               {NAV_ITEMS.map((item) => (
                  <Link
                     key={item.path}
                     href={item.path}
                     className={cn(
                        "text-sm font-medium transition-colors text-white/70 hover:text-white",
                        pathname === item.path ? "text-white font-bold" : ""
                     )}
                  >
                     {item.name}
                  </Link>
               ))}
            </div>
            <div>
               {/* Right side actions if needed */}
            </div>
         </div>
      </nav>
   );
}
