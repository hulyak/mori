import { cn } from '@/lib/utils';

interface SpeechBubbleProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

export default function SpeechBubble({ 
  children, 
  direction = 'left',
  className 
}: SpeechBubbleProps) {
  return (
    <div className={cn(
      'relative bg-gradient-to-r from-[#A78BFA]/10 to-[#5EEAD4]/10 rounded-2xl p-4 animate-fade-in-up',
      className
    )}>
      <p className="text-sm font-medium text-foreground">
        {children}
      </p>
      {direction === 'left' && (
        <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-[#A78BFA]/10 border-b-8 border-b-transparent" />
      )}
      {direction === 'right' && (
        <div className="absolute -right-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-[#A78BFA]/10 border-b-8 border-b-transparent" />
      )}
    </div>
  );
}
