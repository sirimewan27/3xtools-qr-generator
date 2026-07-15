import { CONFIG } from '../config';
import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <section className="py-12 sm:py-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Help & Support Center
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 leading-normal">
            Need help customizing patterns, choosing scales, mapping CSV columns, or configuring frame wrappers? Explore our support resources below.
          </p>
        </div>

        {/* Cards columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-605 dark:text-indigo-400 font-bold font-outfit">1</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Standard QR Designer</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Choose your tab, enter website url or parameters, customize background modules, margins, frames, color palettes, and download vector SVGs instantly.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-605 dark:text-indigo-400 font-bold font-outfit">2</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Bulk QR Exporter</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Upload any standard `.csv` file. Choose column keys representing QR payload data and filenames. Previews will generate with frames and pack directly into a `.zip`.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-605 dark:text-indigo-400 font-bold font-outfit">3</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Error Capability</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Use High (30%) correction level if your QR code contains logo overlays or customized pixel structures, ensuring smartphones can decode properly.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold font-outfit">✉</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Contact Support</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Have extra feedback or require customized features for your enterprise? Contact us directly at <span className="font-bold text-indigo-600 dark:text-indigo-400">{CONFIG.support.email}</span>.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
