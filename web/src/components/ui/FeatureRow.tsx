"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureRowProps {
   title: string;
   description: string;
   image: string;
   index: number;
}

export default function FeatureRow({ title, description, image, index }: FeatureRowProps) {
   const isEven = index % 2 === 0;

   return (
      <section className="py-24 overflow-hidden">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className={cn(
               "flex flex-col gap-12 items-center",
               isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}>
               {/* Text Content */}
               <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex-1 space-y-6"
               >
                  <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                     {title}
                  </h3>
                  <p className="text-xl text-slate-300 leading-relaxed font-light">
                     {description}
                  </p>
               </motion.div>

               {/* Image Content */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: isEven ? -2 : 2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="flex-1 w-full"
               >
                  <div className={cn(
                     "relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-800",
                     isEven ? "md:mr-auto" : "md:ml-auto"
                  )}>
                     <div className="absolute inset-0 bg-gradient-to-tr from-black/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                     <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                     />
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
   );
}
