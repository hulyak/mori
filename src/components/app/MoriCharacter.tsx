import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

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
  const [currentImage, setCurrentImage] = useState('/puppy.png');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-40 h-40'
  };

  const getMoriImage = (moodState: string) => {
    switch (moodState) {
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

  // Handle mood transitions with cross-fade
  useEffect(() => {
    const newImage = getMoriImage(mood);
    if (newImage !== currentImage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage(newImage);
        setIsTransitioning(false);
      }, 100);
    }

    // Trigger celebrate animation
    if (mood === 'celebrate') {
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 300);
    }
  }, [mood, currentImage]);

  const levelProgress = ((5 - sessionsToNextLevel) / 5) * 100;

  // Determine animation class based on mood
  const getAnimationClass = () => {
    if (isCelebrating) return 'animate-mori-celebrate';
    if (mood === 'idle') return 'animate-mori-float';
    return '';
  };

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div className={cn(
        sizeClasses[size],
        'rounded-full overflow-hidden shadow-lg border-2 border-[#A78BFA]/30 transition-transform hover:scale-105',
        getAnimationClass()
      )}>
        <img 
          src={currentImage} 
          alt="Mori - Your digital companion" 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-200",
            isTransitioning ? 'opacity-0' : 'opacity-100'
          )}
        />
      </div>
      {showSparkle && (
        <div className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse">
          ✨
        </div>
      )}
      {mood === 'celebrate' && (
        <>
          <div className="absolute -top-2 -left-2 text-lg animate-bounce" style={{ animationDuration: '500ms' }}>🎉</div>
          <div className="absolute -top-2 -right-2 text-lg animate-bounce" style={{ animationDuration: '500ms', animationDelay: '100ms' }}>✨</div>
        </>
      )}
      {showLevel && (
        <div className="mt-3 min-w-[120px] animate-fade-in-up">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-xs font-medium text-muted-foreground">Mori</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-[#A78BFA]">Level {level}</span>
          </div>
          <div className="w-full h-1.5 bg-border/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#A78BFA] to-[#5EEAD4] transition-all duration-500 ease-out"
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
