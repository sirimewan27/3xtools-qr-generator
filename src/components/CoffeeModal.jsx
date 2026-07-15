import { CONFIG } from '../config';
import { X, Coffee, Heart } from 'lucide-react';

export default function CoffeeModal({
  showCoffeeModal,
  setShowCoffeeModal
}) {
  if (!showCoffeeModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 dark:bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-indigo-100/50 dark:border-zinc-800/80 max-w-md w-full rounded-3xl p-6 sm:p-8 relative shadow-xl text-center space-y-6 overflow-hidden transition-all duration-300">

        {/* Soft decorative color accents inside modal layout */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close */}
        <button
          onClick={() => setShowCoffeeModal(false)}
          className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 dark:text-zinc-500 transition-all cursor-pointer focus:outline-none z-20"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Coffee Animation Badge */}
        <div className="mx-auto h-16 w-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-inner group hover:scale-110 transition-all duration-300 animate-bounce z-10">
          <Coffee className="h-8 w-8" />
        </div>

        <div className="space-y-2 z-10 relative">
          <h3 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white">QR Code Ready! 🎉</h3>
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest pl-1">Download Successful</p>
        </div>

        <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed z-10 relative">
          Your QR Code has been compiled and downloaded completely offline. If our private, ad-free suite saved you time or money, consider buying us a coffee to keep it running free forever!
        </p>

        <div className="flex flex-col gap-2 pt-2 z-10 relative">
          <a
            href={CONFIG.support.coffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-750 dark:bg-indigo-400 dark:hover:bg-indigo-500 text-white dark:text-zinc-950 font-extrabold text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-indigo-600/10 dark:hover:shadow-indigo-400/10 active:scale-95 flex items-center justify-center gap-2 cursor-pointer focus:outline-none hover:-translate-y-0.5"
          >
            <Heart className="h-4.5 w-4.5 fill-current" />
            <span>Support with a Coffee ($5)</span>
          </a>
          <button
            onClick={() => setShowCoffeeModal(false)}
            className="w-full py-3.5 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 font-extrabold text-sm uppercase tracking-wider rounded-2xl transition-all text-center cursor-pointer focus:outline-none active:scale-95"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
