import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import MoriCharacter from './MoriCharacter';
import SpeechBubble from './SpeechBubble';
import BreakModal from './BreakModal';
import { Play, Pause, Square, Plus, Droplets, Activity, Eye, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

type TimerState = 'idle' | 'focus' | 'paused' | 'break';

export default function DashboardScreen() {
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60); // 5 minutes
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  
  // Wellness tracking
  const [wellness, setWellness] = useState({
    breaks: { current: 0, goal: 4 },
    water: { current: 0, goal: 8 },
    movement: { current: 0, goal: 3 },
  });

  // Onboarding checklist
  const [checklist, setChecklist] = useState({
    focusSession: false,
    addTask: false,
    takeBreak: false,
  });

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerState === 'focus' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerState === 'focus' && timeLeft === 0) {
      // Focus session complete
      setShowBreakModal(true);
      setTimerState('idle');
      setTimeLeft(25 * 60);
      setChecklist((prev) => ({ ...prev, focusSession: true }));
    } else if (timerState === 'break' && breakTimeLeft > 0) {
      interval = setInterval(() => {
        setBreakTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerState === 'break' && breakTimeLeft === 0) {
      // Break complete
      setTimerState('idle');
      setBreakTimeLeft(5 * 60);
      setWellness((prev) => ({
        ...prev,
        breaks: { ...prev.breaks, current: prev.breaks.current + 1 },
      }));
      setChecklist((prev) => ({ ...prev, takeBreak: true }));
    }

    return () => clearInterval(interval);
  }, [timerState, timeLeft, breakTimeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartFocus = () => {
    setTimerState('focus');
  };

  const handlePause = () => {
    setTimerState('paused');
  };

  const handleResume = () => {
    setTimerState('focus');
  };

  const handleEndSession = () => {
    setTimerState('idle');
    setTimeLeft(25 * 60);
  };

  const handleStartBreak = () => {
    setShowBreakModal(false);
    setTimerState('break');
    setWellness((prev) => ({
      ...prev,
      breaks: { ...prev.breaks, current: prev.breaks.current + 1 },
    }));
    setChecklist((prev) => ({ ...prev, takeBreak: true }));
  };

  const handleSkipBreak = () => {
    setShowBreakModal(false);
    setTimerState('idle');
  };

  const handleAddTask = () => {
    if (newTask.trim() && tasks.length < 5) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask.trim(), completed: false }]);
      setNewTask('');
      setIsAddingTask(false);
      setChecklist((prev) => ({ ...prev, addTask: true }));
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getMoriMessage = () => {
    if (timerState === 'focus') {
      return "I'll remind you when it's time for a break. 🎯";
    }
    if (timerState === 'break') {
      return "Stand up, stretch, or grab some water. 💧";
    }
    return "When you're ready, hit start and I'll keep track. ✨";
  };

  const WellnessRing = ({ current, goal, color, icon: Icon, label }: { 
    current: number; 
    goal: number; 
    color: string; 
    icon: React.ElementType;
    label: string;
  }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    const circumference = 2 * Math.PI * 20;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="bg-white rounded-2xl p-4 border border-border/30 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-border/30"
            />
            <circle
              cx="28"
              cy="28"
              r="20"
              stroke={color}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{current}/{goal}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src="/puppy.png" alt="Mori" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold text-foreground">Mori</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Today with Mori</h1>
          <p className="text-muted-foreground mt-1">
            {timerState === 'idle' 
              ? "Mori will start nudging you once you run your first focus session."
              : timerState === 'focus'
              ? "Focus mode active. You've got this!"
              : timerState === 'break'
              ? "Taking a well-deserved break."
              : "Session paused. Resume when ready."}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Focus + Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Focus Session Card */}
            <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-border/30">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                {timerState === 'break' ? 'Break' : 'Focus session'}
              </h2>

              <div className="flex items-center gap-8">
                {/* Timer */}
                <div className="flex-1">
                  <div className="text-center">
                    <div className={`text-7xl font-bold tracking-tight ${
                      timerState === 'focus' ? 'text-[#A78BFA]' : 
                      timerState === 'break' ? 'text-[#5EEAD4]' : 
                      'text-foreground'
                    }`}>
                      {timerState === 'break' ? formatTime(breakTimeLeft) : formatTime(timeLeft)}
                    </div>
                    <p className="text-muted-foreground mt-2">
                      {timerState === 'idle' && 'Ready when you are'}
                      {timerState === 'focus' && 'In focus'}
                      {timerState === 'paused' && 'Paused'}
                      {timerState === 'break' && 'Time to step away'}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-3 mt-6">
                    {timerState === 'idle' && (
                      <Button
                        onClick={handleStartFocus}
                        className="h-12 px-8 rounded-xl bg-[#A78BFA] hover:bg-[#9678E8] text-white font-medium shadow-lg hover:shadow-xl transition-all"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start focus
                      </Button>
                    )}
                    {timerState === 'focus' && (
                      <>
                        <Button
                          onClick={handlePause}
                          variant="outline"
                          className="h-12 px-6 rounded-xl border-border/50"
                        >
                          <Pause className="w-5 h-5 mr-2" />
                          Pause
                        </Button>
                        <Button
                          onClick={handleEndSession}
                          variant="outline"
                          className="h-12 px-6 rounded-xl border-border/50"
                        >
                          <Square className="w-5 h-5 mr-2" />
                          End session
                        </Button>
                      </>
                    )}
                    {timerState === 'paused' && (
                      <>
                        <Button
                          onClick={handleResume}
                          className="h-12 px-8 rounded-xl bg-[#A78BFA] hover:bg-[#9678E8] text-white font-medium shadow-lg"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Resume
                        </Button>
                        <Button
                          onClick={handleEndSession}
                          variant="outline"
                          className="h-12 px-6 rounded-xl border-border/50"
                        >
                          <Square className="w-5 h-5 mr-2" />
                          End
                        </Button>
                      </>
                    )}
                    {timerState === 'break' && (
                      <Button
                        onClick={() => {
                          setTimerState('idle');
                          setBreakTimeLeft(5 * 60);
                        }}
                        variant="outline"
                        className="h-12 px-6 rounded-xl border-border/50"
                      >
                        Skip break
                      </Button>
                    )}
                  </div>
                </div>

                {/* Mori */}
                <div className="hidden md:flex flex-col items-center gap-3">
                  <MoriCharacter 
                    size="lg" 
                    mood={timerState === 'focus' ? 'focused' : timerState === 'break' ? 'relaxed' : 'neutral'}
                    showSparkle={timerState === 'idle'}
                  />
                  <SpeechBubble className="max-w-[200px] text-center">
                    {getMoriMessage()}
                  </SpeechBubble>
                </div>
              </div>
            </div>

            {/* Tasks Card */}
            <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-border/30">
              <h2 className="text-lg font-semibold text-foreground mb-4">Today's tasks</h2>

              {tasks.length === 0 && !isAddingTask ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Add up to 5 tasks so today stays realistic.
                  </p>
                  <Button
                    onClick={() => setIsAddingTask(true)}
                    variant="outline"
                    className="rounded-xl border-dashed border-2 border-border/50 hover:border-[#A78BFA]/50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add a task
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        task.completed 
                          ? 'bg-[#5EEAD4]/10 border-[#5EEAD4]/30' 
                          : 'bg-[#F5F1E8]/30 border-border/30'
                      }`}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="data-[state=checked]:bg-[#5EEAD4] data-[state=checked]:border-[#5EEAD4]"
                      />
                      <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.text}
                      </span>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {isAddingTask ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="What needs to get done?"
                        className="flex-1 h-12 rounded-xl"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                        autoFocus
                      />
                      <Button
                        onClick={handleAddTask}
                        className="h-12 px-4 rounded-xl bg-[#A78BFA] hover:bg-[#9678E8]"
                      >
                        <Check className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAddingTask(false);
                          setNewTask('');
                        }}
                        variant="outline"
                        className="h-12 px-4 rounded-xl"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  ) : tasks.length < 5 && (
                    <Button
                      onClick={() => setIsAddingTask(true)}
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add another task
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Wellness Rings */}
            <div className="grid grid-cols-3 gap-4">
              <WellnessRing
                current={wellness.breaks.current}
                goal={wellness.breaks.goal}
                color="#A78BFA"
                icon={Pause}
                label="Breaks"
              />
              <WellnessRing
                current={wellness.water.current}
                goal={wellness.water.goal}
                color="#5EEAD4"
                icon={Droplets}
                label="Water"
              />
              <WellnessRing
                current={wellness.movement.current}
                goal={wellness.movement.goal}
                color="#FBBF24"
                icon={Activity}
                label="Movement"
              />
            </div>
          </div>

          {/* Sidebar - Onboarding Checklist */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] shadow-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Get set up</h3>
              <div className="space-y-3">
                <div className={`flex items-center gap-3 p-3 rounded-xl ${
                  checklist.focusSession ? 'bg-[#5EEAD4]/10' : 'bg-[#F5F1E8]/30'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    checklist.focusSession ? 'bg-[#5EEAD4]' : 'border-2 border-border'
                  }`}>
                    {checklist.focusSession && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={checklist.focusSession ? 'text-muted-foreground line-through' : 'text-foreground'}>
                    Start one focus session
                  </span>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-xl ${
                  checklist.addTask ? 'bg-[#5EEAD4]/10' : 'bg-[#F5F1E8]/30'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    checklist.addTask ? 'bg-[#5EEAD4]' : 'border-2 border-border'
                  }`}>
                    {checklist.addTask && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={checklist.addTask ? 'text-muted-foreground line-through' : 'text-foreground'}>
                    Add at least one task
                  </span>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-xl ${
                  checklist.takeBreak ? 'bg-[#5EEAD4]/10' : 'bg-[#F5F1E8]/30'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    checklist.takeBreak ? 'bg-[#5EEAD4]' : 'border-2 border-border'
                  }`}>
                    {checklist.takeBreak && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={checklist.takeBreak ? 'text-muted-foreground line-through' : 'text-foreground'}>
                    Take one short break with Mori
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Mori will adapt once you finish these steps.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#A78BFA]/10 to-[#5EEAD4]/10 rounded-[2rem] p-6 border border-border/30">
              <h3 className="text-sm font-semibold text-foreground mb-3">Quick wellness</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 rounded-xl hover:bg-white/50"
                  onClick={() => setWellness(prev => ({
                    ...prev,
                    water: { ...prev.water, current: Math.min(prev.water.current + 1, prev.water.goal) }
                  }))}
                >
                  <Droplets className="w-4 h-4 mr-2 text-[#5EEAD4]" />
                  Log water
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 rounded-xl hover:bg-white/50"
                  onClick={() => setWellness(prev => ({
                    ...prev,
                    movement: { ...prev.movement, current: Math.min(prev.movement.current + 1, prev.movement.goal) }
                  }))}
                >
                  <Activity className="w-4 h-4 mr-2 text-[#FBBF24]" />
                  Log movement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Break Modal */}
      <BreakModal
        isOpen={showBreakModal}
        onStartBreak={handleStartBreak}
        onSkip={handleSkipBreak}
      />
    </div>
  );
}
