import { CONFIG } from '../config';
import { Coffee, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

export default function CoffeeModal({
  showCoffeeModal,
  setShowCoffeeModal
}) {
  return (
    <Dialog open={showCoffeeModal} onOpenChange={setShowCoffeeModal}>
      <DialogContent className="max-w-md text-center space-y-4">
        <DialogHeader className="items-center space-y-3">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 animate-bounce">
            <Coffee className="h-7 w-7" />
          </div>
          <DialogTitle className="text-2xl font-extrabold text-foreground">QR Code Ready! 🎉</DialogTitle>
          <DialogDescription className="text-xs font-bold text-primary uppercase tracking-widest">
            Download Successful
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Your QR Code has been compiled and downloaded completely offline. If our private, ad-free suite saved you time or money, consider buying us a coffee to keep it running free forever!
        </p>

        <DialogFooter className="flex-col sm:flex-col gap-2 pt-2">
          <a
            href={CONFIG.support.coffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full gap-2 font-extrabold text-xs uppercase tracking-wider">
              <Heart className="h-4 w-4 fill-current" />
              <span>Support with a Coffee ($5)</span>
            </Button>
          </a>
          <Button
            variant="outline"
            onClick={() => setShowCoffeeModal(false)}
            className="w-full text-xs font-extrabold uppercase tracking-wider"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
