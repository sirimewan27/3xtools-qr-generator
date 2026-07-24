import { CONFIG } from '../config';
import { QrCode, Coffee, Heart, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Footer({
  setPage,
  setShowCoffeeModal
}) {
  return (
    <>
      {/* Support Banner */}
      <section className="bg-muted/30 border-t border-border py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border border-border bg-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left z-10">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Coffee className="h-6 w-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-foreground flex items-center justify-center sm:justify-start gap-1.5">
                  <span>{CONFIG.support.coffeeHeading}</span>
                  <span className="text-rose-500 animate-pulse">❤️</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                  {CONFIG.support.coffeeSub}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowCoffeeModal(true)}
              className="gap-2 text-xs uppercase font-extrabold tracking-wider"
            >
              <Heart className="h-4 w-4 fill-current" />
              <span>Buy us a Coffee</span>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-muted-foreground border-t border-border py-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-border">

            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                  <QrCode className="h-4 w-4" />
                </div>
                <span className="font-extrabold text-foreground text-base">{CONFIG.brand.title}</span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm text-muted-foreground">
                Design custom QR codes with high-resolution frames, custom modules, eye patterns, and colors completely locally in your browser.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">Features</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setPage('generator')} className="hover:text-primary cursor-pointer focus:outline-none transition-colors">
                    QR Designer
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage('faq')} className="hover:text-primary cursor-pointer focus:outline-none transition-colors">
                    FAQs
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage('help')} className="hover:text-primary cursor-pointer focus:outline-none transition-colors">
                    Help & Support
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage('tools')} className="hover:text-primary cursor-pointer focus:outline-none transition-colors">
                    Other Tools
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Privacy */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">Privacy & Trust</h4>
              <p className="text-xs leading-relaxed text-muted-foreground">
                This QR Suite runs entirely in browser memory. No data is stored, shared, or sent to external servers. Your security is our highest priority.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${CONFIG.support.email}`} className="hover:underline">{CONFIG.support.email}</a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
            <p>© {new Date().getFullYear()} {CONFIG.brand.logoText}. All rights reserved. 100% private local compilation.</p>
            <p>Built with pure Shadcn UI components.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
