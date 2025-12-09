import { Button } from '@/components/ui/button';
import MoriCharacter from './MoriCharacter';

interface BreakModalProps {
  isOpen: boolean;
  onStartBreak: () => void;
  onSkip: () => void;
}

export default function BreakModal({ isOpen, onStartBreak, onSkip }: BreakModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onSkip}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in-95 fade-in duration-200">
        {/* Confetti/celebration effect */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl">
          🎉
        </div>

        <div className="text-center">
          {/* Mori */}
          <div className="flex justify-center mb-6">
            <MoriCharacter size="lg" mood="happy" showSparkle />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            Nice work!
          </h2>
          <p className="text-muted-foreground mb-8">
            You finished a focus session. Take a 5 minute break?
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={onStartBreak}
              className="h-12 px-8 rounded-xl bg-[#5EEAD4] hover:bg-[#4DD9C3] text-foreground font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Start break
            </Button>
            <Button
              onClick={onSkip}
              variant="outline"
              className="h-12 px-8 rounded-xl border-border/50"
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
