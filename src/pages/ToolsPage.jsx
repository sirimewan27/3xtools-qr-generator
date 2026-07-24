import { CONFIG } from '../config';
import { Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ToolsPage() {
  return (
    <section className="py-12 sm:py-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Layers className="h-6 w-6" />
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            Explore Our Other Tools
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-normal">
            Discover more premium, 100% private, and ad-free offline utility tools designed with visual excellence to simplify your workflows.
          </p>
        </div>

        {/* Grid of Tools */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.otherTools.map((tool, i) => (
            <Card key={i} className="border border-border bg-card p-6 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-300 group py-0">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center justify-between pt-6">
                  <Badge variant="outline" className="text-[10px] font-bold uppercase bg-primary/10 text-primary border-primary/20">
                    {tool.badge}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">0{i + 1}</span>
                </div>

                <h3 className="font-extrabold text-foreground text-lg group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tool.desc}
                </p>

                <div className="pt-4 pb-6">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <Button variant="outline" className="w-full text-xs font-bold gap-1.5">
                      <span>Launch Tool</span>
                      <span className="text-xs">➜</span>
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
