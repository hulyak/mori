import { cn } from '@/lib/utils';

interface MoriCharacterProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'neutral' | 'happy' | 'focused' | 'relaxed' | 'encouraging';
  className?: string;
  showSparkle?: boolean;
}

export default function MoriCharacter({ 
  size = 'md', 
  mood = 'neutral',
  className,
  showSparkle = false
}: MoriCharacterProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-40 h-40'
  };

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div className={cn(
        sizeClasses[size],
        'rounded-full overflow-hidden shadow-lg border-2 border-[#A78BFA]/30 transition-transform hover:scale-105'
      )}>
        <img 
          src="/puppy.png" 
          alt="Mori - Your digital companion" 
          className="w-full h-full object-cover"
        />
      </div>
      {showSparkle && (
        <div className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400">
          ✨
        </div>
      )}
    </div>
  );
}
