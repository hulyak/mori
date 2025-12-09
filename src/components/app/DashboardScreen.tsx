import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import MoriCharacter from './MoriCharacter';
import SpeechBubble from './SpeechBubble';
import BreakModal from './BreakModal';
import { Play, Pause, Square, Plus, Droplets, Activity, Check, X, HelpCircle, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface FocusSession {
  id: string;
  duration: number; // in minutes
  type: 'focus' | 'break';
  completedAt: Date;
}

type TimerState = 'idle' | 'focus' | 'paused' | 'break';
type ViewTab = 'today' | 'week';

export default function DashboardScreen() {
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60); // 5 minutes
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [showSessionComplete, setShowSessionComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewTab>('today');
  const [showFirstTimeTooltips, setShowFirstTimeTooltips] = useState(true);
  
  // Session history
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [lastSessionDuration, setLastSessionDuration] = useState(25);
  
  // Wellness tracking
  const [wellness, setWellness] = useState({
    breaks: { current: 0, goal: 4 },
    water: { current: 0, goal: 8 },
    move: { current: 0, goal: 3 },
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
      const sessionDuration = 25;
      setLastSessionDuration(sessionDuration);
      setSessions(prev => [...prev, {
        id: Date.now().toString(),
        duration: sessionDuration,
        type: 'focus',
        completedAt: new Date()
      }]);
      setShowSessionComplete(true);
      setTimerState('idle');
      setTimeLeft(25 * 60);
      setChecklist((prev) => ({ ...prev, focusSession: true }));
      setShowFirstTimeTooltips(false);
    } else if (timerState === 'break' && breakTimeLeft > 0) {
      interval = setInterval(() => {
        setBreakTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerState === 'break' && breakTimeLeft === 0) {
      // Break complete
      setSessions(prev => [...prev, {
        id: Date.now().toString(),
        duration: 5,
        type: 'break',
        completedAt: new Date()
      }]);
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
    setShowSessionComplete(false);
    setTimerState('break');
    setWellness((prev) => ({
      ...prev,
      breaks: { ...prev.breaks, current: prev.breaks.current + 1 },
    }));
    setChecklist((prev) => ({ ...prev, takeBreak: true }));
  };

  const handleSkipBreak = () => {
    setShowBreakModal(false);
    setShowSessionComplete(false);
    setTimerState('idle');
  };

  // Calculate stats
  const todaySessions = sessions.filter(s => s.type === 'focus');
  const totalFocusMinutes = todaySessions.reduce((acc, s) => acc + s.duration, 0);
  const completedTasks = tasks.filter(t => t.completed).length;

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

  const WellnessRing = ({ current, goal, color, icon: Icon, label, subtext, helpTitle, helpText, onLog }: { 
    current: number; 
    goal: number; 
    color: string; 
    icon: React.ElementType;
    label: string;
    subtext: string;
    helpTitle: string;
    helpText: string;
    onLog: () => void;
  }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    const circumference = 2 * Math.PI * 20;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="bg-white rounded-2xl p-4 border border-border/30 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <svg className="w-12 h-12 -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-border/30"
                  />
                  <circle
                    cx="24"
                    cy="24"
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
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <HelpCircle className="w-3 h-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground truncate">{subtext}</p>
                <p className="text-xs font-medium text-foreground mt-0.5">{current}/{goal} today</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLog();
                }}
                className="w-8 h-8 rounded-full bg-[#F5F1E8]/50 hover:bg-[#F5F1E8] flex items-center justify-center transition-colors"
                style={{ color }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 rounded-2xl">
          <div className="flex items-start gap-3">
            <MoriCharacter size="sm" />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-sm">{helpTitle}</h4>
              <p className="text-xs text-muted-foreground mt-1">{helpText}</p>
              <Button
                onClick={onLog}
                size="sm"
                className="mt-3 rounded-lg text-xs h-8"
                style={{ backgroundColor: color }}
              >
                Log {label.toLowerCase()}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
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

        {/* Session Complete Banner */}
        {showSessionComplete && (
          <div className="mb-6 bg-gradient-to-r from-[#A78BFA]/10 via-[#5EEAD4]/10 to-[#FBBF24]/10 rounded-[2rem] p-6 border border-[#A78BFA]/20 relative overflow-hidden">
            <div className="absolute top-2 right-4 text-2xl">🎉</div>
            <div className="flex items-center gap-6">
              <MoriCharacter size="md" mood="happy" showSparkle />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">Session complete!</h3>
                <p className="text-muted-foreground mt-1">
                  You just finished a {lastSessionDuration}-minute focus block.
                </p>
                <p className="text-sm font-medium text-foreground mt-2">
                  Today: {todaySessions.length} session{todaySessions.length !== 1 ? 's' : ''} • {totalFocusMinutes} min focused
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleStartBreak}
                  className="h-11 px-6 rounded-xl bg-[#5EEAD4] hover:bg-[#4DD9C3] text-foreground font-medium shadow-lg"
                >
                  Start a break
                </Button>
                <Button
                  onClick={() => setShowSessionComplete(false)}
                  variant="outline"
                  className="h-11 px-6 rounded-xl"
                >
                  Back to dashboard
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Today/Week Toggle */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'today'
                ? 'bg-[#A78BFA] text-white shadow-md'
                : 'bg-white border border-border/50 text-foreground hover:border-[#A78BFA]/50'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'week'
                ? 'bg-[#A78BFA] text-white shadow-md'
                : 'bg-white border border-border/50 text-foreground hover:border-[#A78BFA]/50'
            }`}
          >
            Week
          </button>
        </div>

        {/* Week View */}
        {activeTab === 'week' && (
          <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-border/30 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">This week</h2>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#A78BFA]">{todaySessions.length}</p>
                <p className="text-xs text-muted-foreground">Total sessions</p>
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-[#F5F1E8]/50 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-foreground">
                This week: {todaySessions.length} sessions • {totalFocusMinutes} min focused
              </p>
            </div>

            {/* Session list */}
            {sessions.length > 0 ? (
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      session.type === 'focus'
                        ? 'bg-[#A78BFA]/5 border border-[#A78BFA]/20'
                        : 'bg-[#5EEAD4]/5 border border-[#5EEAD4]/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        session.type === 'focus' ? 'bg-[#A78BFA]/20' : 'bg-[#5EEAD4]/20'
                      }`}>
                        {session.type === 'focus' ? (
                          <Target className="w-5 h-5 text-[#A78BFA]" />
                        ) : (
                          <Pause className="w-5 h-5 text-[#5EEAD4]" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {session.type === 'focus' ? 'Focus session' : 'Break'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.completedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{session.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No sessions yet this week.</p>
                <p className="text-sm text-muted-foreground mt-1">Start a focus session to see your history here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'today' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Focus + Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Focus Session Card */}
            <div className={`bg-white rounded-[2rem] shadow-lg p-8 border transition-all ${
              timerState === 'focus' 
                ? 'border-[#A78BFA]/30 bg-gradient-to-br from-white to-[#A78BFA]/5' 
                : timerState === 'break'
                ? 'border-[#5EEAD4]/30 bg-gradient-to-br from-white to-[#5EEAD4]/5'
                : 'border-border/30'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">
                  {timerState === 'break' ? 'Break' : 'Focus session'}
                </h2>
                {/* Sessions today stat */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#A78BFA]">{todaySessions.length}</p>
                    <p className="text-xs text-muted-foreground">Sessions today</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{totalFocusMinutes}m</p>
                    <p className="text-xs text-muted-foreground">Focus time</p>
                  </div>
                </div>
              </div>

              {/* First-time tooltip */}
              {showFirstTimeTooltips && timerState === 'idle' && todaySessions.length === 0 && (
                <div className="mb-4 bg-[#A78BFA]/10 rounded-xl p-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" />
                  <p className="text-sm text-foreground">Start here to run your first focus session.</p>
                  <button 
                    onClick={() => setShowFirstTimeTooltips(false)}
                    className="ml-auto text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

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

              {/* Today's Sessions Timeline */}
              {sessions.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Today's sessions</p>
                  <div className="flex flex-wrap gap-2">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          session.type === 'focus'
                            ? 'bg-[#A78BFA]/10 text-[#A78BFA]'
                            : 'bg-[#5EEAD4]/10 text-[#5EEAD4]'
                        }`}
                      >
                        {session.duration}m • {session.type === 'focus' ? 'Focus' : 'Break'}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tasks Card */}
            <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-border/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Today's tasks</h2>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{completedTasks}/{tasks.length}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>

              {/* First-time tooltip for tasks */}
              {showFirstTimeTooltips && tasks.length === 0 && !isAddingTask && (
                <div className="mb-4 bg-[#5EEAD4]/10 rounded-xl p-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
                  <p className="text-sm text-foreground">Add a few tasks so Mori knows what today looks like.</p>
                  <button 
                    onClick={() => setShowFirstTimeTooltips(false)}
                    className="ml-auto text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

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

            {/* Breaks & Habits */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Breaks & habits</h3>
              <div className="grid grid-cols-3 gap-4">
                <WellnessRing
                  current={wellness.breaks.current}
                  goal={wellness.breaks.goal}
                  color="#A78BFA"
                  icon={Pause}
                  label="Breaks"
                  subtext="Short pauses away from screen"
                  helpTitle='What counts as a "Break"?'
                  helpText="Any time you step away from your screen for a few minutes. Mori logs these automatically after focus sessions."
                  onLog={() => setWellness(prev => ({
                    ...prev,
                    breaks: { ...prev.breaks, current: Math.min(prev.breaks.current + 1, prev.breaks.goal + 2) }
                  }))}
                />
                <WellnessRing
                  current={wellness.water.current}
                  goal={wellness.water.goal}
                  color="#5EEAD4"
                  icon={Droplets}
                  label="Water"
                  subtext="Glasses you've had today"
                  helpTitle='What counts as "Water"?'
                  helpText="Each glass or cup of water you drink. Staying hydrated helps you focus better and feel more energized."
                  onLog={() => setWellness(prev => ({
                    ...prev,
                    water: { ...prev.water, current: Math.min(prev.water.current + 1, prev.water.goal + 2) }
                  }))}
                />
                <WellnessRing
                  current={wellness.move.current}
                  goal={wellness.move.goal}
                  color="#FBBF24"
                  icon={Activity}
                  label="Move"
                  subtext="Quick stretch or walk"
                  helpTitle='What counts as "Move"?'
                  helpText="Any quick bit of movement: a stretch, a short walk, or a posture reset. Log one when you come back."
                  onLog={() => setWellness(prev => ({
                    ...prev,
                    move: { ...prev.move, current: Math.min(prev.move.current + 1, prev.move.goal + 2) }
                  }))}
                />
              </div>
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
              <h3 className="text-sm font-semibold text-foreground mb-3">Quick log</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 rounded-xl hover:bg-white/50"
                  onClick={() => setWellness(prev => ({
                    ...prev,
                    water: { ...prev.water, current: Math.min(prev.water.current + 1, prev.water.goal + 2) }
                  }))}
                >
                  <Droplets className="w-4 h-4 mr-2 text-[#5EEAD4]" />
                  Log water
                  <span className="ml-auto text-xs text-muted-foreground">{wellness.water.current}/{wellness.water.goal}</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 rounded-xl hover:bg-white/50"
                  onClick={() => setWellness(prev => ({
                    ...prev,
                    move: { ...prev.move, current: Math.min(prev.move.current + 1, prev.move.goal + 2) }
                  }))}>
                  <Activity className="w-4 h-4 mr-2 text-[#FBBF24]" />
                  Log movement
                  <span className="ml-auto text-xs text-muted-foreground">{wellness.move.current}/{wellness.move.goal}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        )}
      </main>

      {/* Break Modal */}
      <BreakModal
        isOpen={showBreakModal}
        onStartBreak={handleStartBreak}
        onSkip={handleSkipBreak}
        sessionDuration={lastSessionDuration}
        totalSessions={todaySessions.length}
        totalMinutes={totalFocusMinutes}
      />
    </div>
  );
}
