import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import MoriCharacter from './MoriCharacter';
import SpeechBubble from './SpeechBubble';
import { Clock, Droplets, Activity, Eye } from 'lucide-react';

const focusPatterns = [
  { id: '25-5', label: '25 min focus / 5 min break' },
  { id: '40-10', label: '40 min focus / 10 min break' },
  { id: '50-10', label: '50 min focus / 10 min break' },
  { id: 'custom', label: 'Custom' },
];

export default function DaySetupScreen() {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [selectedPattern, setSelectedPattern] = useState('25-5');
  const [reminders, setReminders] = useState({
    water: true,
    stretch: true,
    eyes: true,
  });

  const handleNext = () => {
    navigate('/onboarding/meet-mori');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div className="bg-white rounded-[2rem] shadow-xl p-8 lg:p-10 border border-border/50">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tell Mori how you work
            </h1>
            <p className="text-muted-foreground">
              This sets your focus and break rhythm.
            </p>
          </div>

          <div className="space-y-8">
            {/* Work Window */}
            <div className="bg-[#F5F1E8]/50 rounded-2xl p-6">
              <Label className="text-sm font-semibold text-foreground mb-4 block">
                When do you usually work?
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground mb-1 block">Start</Label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-border/50 bg-white text-foreground focus:border-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/20"
                  />
                </div>
                <span className="text-muted-foreground mt-5">to</span>
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground mb-1 block">End</Label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-border/50 bg-white text-foreground focus:border-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/20"
                  />
                </div>
              </div>
            </div>

            {/* Focus Pattern */}
            <div className="bg-[#F5F1E8]/50 rounded-2xl p-6">
              <Label className="text-sm font-semibold text-foreground mb-4 block">
                How long do you like to focus at a time?
              </Label>
              <div className="flex flex-wrap gap-3">
                {focusPatterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => setSelectedPattern(pattern.id)}
                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                      selectedPattern === pattern.id
                        ? 'bg-[#A78BFA] text-white shadow-md'
                        : 'bg-white border border-border/50 text-foreground hover:border-[#A78BFA]/50'
                    }`}
                  >
                    {pattern.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wellness Prompts */}
            <div className="bg-[#F5F1E8]/50 rounded-2xl p-6">
              <Label className="text-sm font-semibold text-foreground mb-4 block">
                What should Mori remind you about?
              </Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5EEAD4]/20 flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-[#5EEAD4]" />
                    </div>
                    <span className="font-medium text-foreground">Drink water</span>
                  </div>
                  <Switch
                    checked={reminders.water}
                    onCheckedChange={(checked) => setReminders({ ...reminders, water: checked })}
                  />
                </div>

                <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#A78BFA]/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <span className="font-medium text-foreground">Stretch or move</span>
                  </div>
                  <Switch
                    checked={reminders.stretch}
                    onCheckedChange={(checked) => setReminders({ ...reminders, stretch: checked })}
                  />
                </div>

                <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FBBF24]/20 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-[#FBBF24]" />
                    </div>
                    <span className="font-medium text-foreground">Short eyes-off-screen breaks</span>
                  </div>
                  <Switch
                    checked={reminders.eyes}
                    onCheckedChange={(checked) => setReminders({ ...reminders, eyes: checked })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mori with clock */}
          <div className="flex items-center gap-4 mt-8 p-4 bg-gradient-to-r from-[#A78BFA]/5 to-[#5EEAD4]/5 rounded-2xl">
            <MoriCharacter size="sm" />
            <SpeechBubble className="flex-1">
              I'll help you stay on track with gentle reminders! ⏰
            </SpeechBubble>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8">
            <Link
              to="/onboarding/meet-mori"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </Link>
            <Button
              onClick={handleNext}
              className="h-12 px-8 rounded-xl bg-[#A78BFA] hover:bg-[#9678E8] text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Next
            </Button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-[#A78BFA]" />
          <div className="w-2 h-2 rounded-full bg-border" />
          <div className="w-2 h-2 rounded-full bg-border" />
        </div>
      </div>
    </div>
  );
}
