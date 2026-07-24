import { CONFIG } from '../config';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function HelpPage() {
  return (
    <section className="py-12 sm:py-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            Help & Support Center
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-normal">
            Need help customizing patterns, choosing scales, mapping CSV columns, or configuring frame wrappers? Explore our support resources below.
          </p>
        </div>

        {/* Cards columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <Card className="border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <h3 className="font-bold text-foreground text-base">Standard QR Designer</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Choose your tab, enter website url or parameters, customize background modules, margins, frames, color palettes, and download vector SVGs instantly.
              </p>
            </div>
          </Card>

          <Card className="border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
              <h3 className="font-bold text-foreground text-base">Bulk QR Exporter</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upload any standard `.csv` file. Choose column keys representing QR payload data and filenames. Previews will generate with frames and pack directly into a `.zip`.
              </p>
            </div>
          </Card>

          <Card className="border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
              <h3 className="font-bold text-foreground text-base">Error Capability</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use High (30%) correction level if your QR code contains logo overlays or customized pixel structures, ensuring smartphones can decode properly.
              </p>
            </div>
          </Card>

          <Card className="border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">✉</div>
              <h3 className="font-bold text-foreground text-base">Contact Support</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Have extra feedback or require customized features for your enterprise? Contact us directly at <span className="font-bold text-primary">{CONFIG.support.email}</span>.
              </p>
            </div>
          </Card>

        </div>

      </div>
    </section>
  );
}
