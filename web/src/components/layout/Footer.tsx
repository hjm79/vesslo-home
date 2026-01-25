
import Link from 'next/link';

export default function Footer() {
   return (
      <footer className="w-full py-10 bg-slate-950 text-slate-400 border-t border-slate-900">
         <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
               <span className="font-bold text-white text-lg">vesslo</span>
               <p className="text-sm mt-1">© {new Date().getFullYear()} Vesslo. All rights reserved.</p>
            </div>

            <div className="flex space-x-6 text-sm">
               <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
               <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
               <Link href="/refund" className="hover:text-white transition">Refund Policy</Link>
               <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
         </div>
      </footer>
   );
}
