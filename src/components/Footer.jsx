import { CONFIG } from '../config';
import { QrCode, Coffee, Heart, Mail } from 'lucide-react';

export default function Footer({
  setPage,
  setShowCoffeeModal
}) {
  return (
    <>
      {/* ==========================================
          Premium Highly Creative, Theme-Matching Buy Coffee Banner
          ========================================== */}
      <section className="bg-slate-50 dark:bg-zinc-950/40 border-t border-slate-200/60 dark:border-zinc-900 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-zinc-900 border border-indigo-100/50 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden transition-all duration-300">

            {/* Soft decorative color accents in corner of card */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row items-center gap-4.5 text-center sm:text-left z-10">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-inner group hover:scale-110 transition-all duration-300">
                <Coffee className="h-6 w-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base font-outfit text-slate-800 dark:text-zinc-200 flex items-center justify-center sm:justify-start gap-1.5">
                  <span>{CONFIG.support.coffeeHeading}</span>
                  <span className="text-red-500 animate-pulse">❤️</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                  {CONFIG.support.coffeeSub}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCoffeeModal(true)}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-750 dark:bg-indigo-400 dark:hover:bg-indigo-500 text-white dark:text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-indigo-600/10 dark:hover:shadow-indigo-400/10 active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 z-10 hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4 fill-current" />
              <span>Buy us a Coffee</span>
            </button>

          </div>
        </div>
      </section>

      {/* ==========================================
          Premium Solid Footer
          ========================================== */}
      <footer className="bg-white dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 border-t border-slate-200/60 dark:border-zinc-800/60 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200/60 dark:border-zinc-800/40">

            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <QrCode className="h-4.5 w-4.5" />
                </div>
                <span className="font-outfit font-extrabold text-slate-900 dark:text-white text-base">{CONFIG.brand.title}</span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm text-slate-500 dark:text-zinc-400">
                Design custom QR codes with high-resolution frames, custom modules, eye patterns, and colors completely locally in your browser.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-zinc-300 uppercase tracking-wider">Features</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setPage('generator')} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer focus:outline-none transition-colors">
                    QR Designer
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage('faq')} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer focus:outline-none transition-colors">
                    FAQs
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage('help')} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer focus:outline-none transition-colors">
                    Help & Support
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage('tools')} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer focus:outline-none transition-colors">
                    Other Tools
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Privacy */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-slate-800 dark:text-zinc-300 uppercase tracking-wider">Privacy & Trust</h4>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
                This QR Suite runs entirely in browser memory. No data is stored, shared, or sent to external servers. Your security is our highest priority.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${CONFIG.support.email}`} className="hover:underline">{CONFIG.support.email}</a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500 gap-4">
            <p>© {new Date().getFullYear()} {CONFIG.brand.logoText}. All rights reserved. 100% private local compilation.</p>
            <p>Designed with absolute visual excellence & flat solid styles.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
