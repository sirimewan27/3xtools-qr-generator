import { CONFIG } from '../config';
import { Layers } from 'lucide-react';

export default function ToolsPage() {
  return (
    <section className="py-12 sm:py-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Layers className="h-6 w-6" />
          </div>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Explore Our Other Tools
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 leading-normal">
            Discover more premium, 100% private, and ad-free offline utility tools designed with visual excellence to simplify your workflows.
          </p>
        </div>

        {/* Grid of Tools */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.otherTools.map((tool, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-lg">
                    {tool.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">0{i + 1}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg font-outfit group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-colors">
                  {tool.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="pt-6">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white dark:hover:text-zinc-950 text-slate-700 dark:text-zinc-300 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-slate-200/40 dark:border-zinc-800"
                >
                  <span>Launch Tool</span>
                  <span className="text-xs">➜</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
