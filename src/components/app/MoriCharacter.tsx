import { cn } from '@/lib/utils';

interface MoriCharacterProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'idle' | 'focus' | 'break' | 'celebrate' | 'tired';
  className?: string;
  showSparkle?: boolean;
  showLevel?: boolean;
  level?: number;
  sessionsToNextLevel?: number;
}

export default function MoriCharacter({ 
  size = 'md', 
  mood = 'idle',
  className,
  showSparkle = false,
  showLevel = false,
  level = 3,
  sessionsToNextLevel = 2
}: MoriCharacterProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-40 h-40'
  };

  const getMoriImage = () => {
    switch (mood) {
      case 'focus':
        return '/focused-mori.png';
      case 'break':
        return '/relax-mori-removebg-preview.png';
      case 'celebrate':
        return '/celebrate-mori-removebg-preview.png';
      case 'tired':
        return '/tired-mori-removebg-preview.png';
      case 'idle':
      default:
        return '/puppy.png';
    }
  };

  const levelProgress = ((5 - sessionsToNextLevel) / 5) * 100;

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div className={cn(
        sizeClasses[size],
        'rounded-full overflow-hidden shadow-lg border-2 border-[#A78BFA]/30 transition-transform hover:scale-105'
      )}>
        <img 
          src={getMoriImage()} 
          alt="Mori - Your digital companion" 
          className="w-full h-full object-cover"
        />
      </div>
      {showSparkle && (
        <div className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400">
          ✨
        </div>
      )}
      {mood === 'celebrate' && (
        <>
          <div className="absolute -top-2 -left-2 text-lg animate-bounce">🎉</div>
          <div className="absolute -top-2 -right-2 text-lg animate-bounce delay-100">✨</div>
        </>
      )}
      {showLevel && (
        <div className="mt-3 min-w-[120px]">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-xs font-medium text-muted-foreground">Mori</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-[#A78BFA]">Level {level}</span>
          </div>
          <div className="w-full h-1.5 bg-border/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#A78BFA] to-[#5EEAD4] transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-0.5">
            Next level: {sessionsToNextLevel} more session{sessionsToNextLevel !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
