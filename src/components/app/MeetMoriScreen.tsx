import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import MoriCharacter from './MoriCharacter';
import SpeechBubble from './SpeechBubble';

const behaviorOptions = [
  { id: 'calm', label: 'Calm and quiet' },
  { id: 'encouraging', label: 'Encouraging' },
  { id: 'playful', label: 'Playful' },
];

const positionOptions = [
  { id: 'bottom-right', label: 'Bottom right' },
  { id: 'bottom-left', label: 'Bottom left' },
  { id: 'next-to-timer', label: 'Next to the timer' },
];

export default function MeetMoriScreen() {
  const navigate = useNavigate();
  const [behavior, setBehavior] = useState('encouraging');
  const [position, setPosition] = useState('bottom-right');

  const handleStart = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl animate-slide-in-right">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-1 rounded-full bg-[#A78BFA]" />
          <div className="w-8 h-1 rounded-full bg-[#A78BFA]" />
          <div className="w-8 h-1 rounded-full bg-[#A78BFA]" />
        </div>
        
        {/* Main Card */}
        <div className="bg-white rounded-[2rem] shadow-xl p-8 lg:p-10 border border-border/50">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Meet Mori
            </h1>
            <p className="text-muted-foreground">
              Your animated desk companion for this workspace.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Mori Illustration */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#A78BFA]/20 via-[#5EEAD4]/20 to-[#F5F1E8]/20 rounded-full blur-3xl scale-150" />
                <MoriCharacter size="xl" mood="idle" showSparkle className="relative z-10" />
              </div>
              <div className="mt-6 max-w-xs">
                <SpeechBubble direction="top" className="text-center">
                  Hi, I'll sit by your desk and keep an eye on your focus and breaks. 👋
                </SpeechBubble>
              </div>
            </div>

            {/* Right - Settings */}
            <div className="space-y-8">
              {/* Behavior */}
              <div className="bg-[#F5F1E8]/50 rounded-2xl p-6">
                <Label className="text-sm font-semibold text-foreground mb-4 block">
                  How should Mori behave?
                </Label>
                <div className="flex flex-wrap gap-3">
                  {behaviorOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setBehavior(option.id)}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        behavior === option.id
                          ? 'bg-[#A78BFA] text-white shadow-md'
                          : 'bg-white border border-border/50 text-foreground hover:border-[#A78BFA]/50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Position */}
              <div className="bg-[#F5F1E8]/50 rounded-2xl p-6">
                <Label className="text-sm font-semibold text-foreground mb-4 block">
                  Where should Mori sit on your screen?
                </Label>
                <div className="space-y-3">
                  {positionOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        position === option.id
                          ? 'bg-[#A78BFA]/10 border-2 border-[#A78BFA]'
                          : 'bg-white border border-border/50 hover:border-[#A78BFA]/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="position"
                        value={option.id}
                        checked={position === option.id}
                        onChange={() => setPosition(option.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        position === option.id ? 'border-[#A78BFA]' : 'border-border'
                      }`}>
                        {position === option.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]" />
                        )}
                      </div>
                      <span className="font-medium text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-center mt-10">
            <Button
              onClick={handleStart}
              className="h-14 px-10 rounded-xl bg-[#A78BFA] hover:bg-[#9678E8] text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-150 active:scale-[0.98]"
            >
              Go to my desk
            </Button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-[#A78BFA]" />
          <div className="w-2 h-2 rounded-full bg-[#A78BFA]" />
          <div className="w-2 h-2 rounded-full bg-border" />
        </div>
      </div>
    </div>
  );
}
