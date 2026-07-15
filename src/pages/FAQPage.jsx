import { FileQuestion, Plus } from 'lucide-react';

const FAQS_DATA = [
  {
    q: 'Are the generated QR codes private?',
    a: 'Absolutely. All compiling and rendering take place strictly inside your browser environment completely client-side. Your inputs, CSV files, and contents are never uploaded to any server, offering absolute privacy.'
  },
  {
    q: 'Can I use these QR codes for commercial projects?',
    a: 'Yes, 100%. All custom vector QR codes downloaded from this suite can be used for branding, printing, packaging, and commercial campaigns. There are no licenses, hidden royalties, or restrictions.'
  },
  {
    q: 'How does the Bulk QR Code generator work?',
    a: 'In the Bulk QR tab, you can enter data line-by-line or drag-and-drop a CSV file. Once loaded, choose which column holds the QR data payloads and (optionally) which column defines the downloaded filenames. The generator will render all of them and package them in a clean ZIP archive!'
  },
  {
    q: 'Is there a limit on bulk generation?',
    a: 'Because the suite compiles codes locally inside browser memory, there are no software limits. However, to maintain peak browser performance, we suggest keeping CSV batches under 1,000 items at a time.'
  },
  {
    q: 'Which file format (PNG or SVG) should I download?',
    a: 'Download PNG images for immediate digital sharing (websites, presentations, social media). Download vector SVGs for professional printing, large-format banners, and editing inside graphic design applications (Illustrator, Figma).'
  }
];

export default function FAQPage({
  expandedFaqIndex,
  setExpandedFaqIndex
}) {
  return (
    <section className="py-12 sm:py-20 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <FileQuestion className="h-6 w-6" />
          </div>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 leading-normal">
            Find fast answers to common questions about generating, customizing, and printing your custom QR codes.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, index) => {
            const isExpanded = expandedFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-900/50 cursor-pointer focus:outline-none transition-all"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <div className={`h-6 w-6 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center transition-all ${isExpanded ? 'rotate-45 text-red-500' : 'text-slate-500'}`}>
                    <Plus className="h-4 w-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-slate-100 dark:border-zinc-800/30 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
