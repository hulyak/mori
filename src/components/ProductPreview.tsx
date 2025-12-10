import { Droplets, Footprints, Pause, Square, Flame, CheckCircle2, Sparkles, Check, StretchHorizontal } from 'lucide-react';

export default function ProductPreview() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-[#A78BFA]/5 via-[#5EEAD4]/5 to-[#F5F1E8]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            See It in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into your new favorite workspace companion
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#A78BFA]/20 via-[#5EEAD4]/20 to-transparent rounded-[3rem] blur-3xl" />
          
          {/* Main Preview Card */}
          <div className="relative bg-[#F9FAFB] rounded-[2.5rem] shadow-2xl overflow-hidden border border-border/50 transition-all duration-300 hover:shadow-[0_25px_80px_rgba(0,0,0,0.15)]">
            {/* Mock Browser Chrome */}
            <div className="bg-white/80 px-6 py-4 flex items-center gap-4 border-b border-border/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 text-center text-sm text-foreground font-semibold">
                Mori
              </div>
              {/* Buddy Badge */}
              <div className="flex items-center gap-2 bg-[#A78BFA]/10 rounded-full px-3 py-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#C4B5FD] flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
                <span className="text-xs font-medium text-[#A78BFA]">Buddy – Level 12 • Energetic</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/50 px-6 py-3 flex gap-6 border-b border-border/20">
              <button className="text-sm font-semibold text-[#A78BFA] border-b-2 border-[#A78BFA] pb-2 transition-all duration-200">Today</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 pb-2 hover:border-b-2 hover:border-border/50">This Week</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 pb-2 hover:border-b-2 hover:border-border/50">Achievements</button>
            </div>

            {/* Mock App Interface - Today Dashboard */}
            <div className="p-6 lg:p-10 space-y-6">
              
              {/* Focus Session Card with Buddy */}
              <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  {/* Buddy Character */}
                  <div className="relative flex-shrink-0 group">
                    <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-lg border-2 border-[#A78BFA]/30 relative transition-transform duration-300 group-hover:scale-105 animate-mori-float">
                      <img 
                        src="/puppy.png" 
                        alt="Buddy - Your digital companion" 
                        className="w-full h-full object-cover"
                      />
                      {/* Sparkle decorations */}
                      <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
                    </div>
                    {/* Speech Bubble */}
                    <div className="absolute -right-4 -bottom-2 bg-white rounded-2xl px-4 py-2 shadow-md border border-border/30 max-w-[180px] transition-all duration-200 hover:shadow-lg hover:scale-105">
                      <p className="text-xs font-medium text-foreground">You're in the zone! Keep it up! 🔥</p>
                      <div className="absolute -left-2 bottom-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
                    </div>
                  </div>

                  {/* Focus Session Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground">Focus Session</h3>
                      <span className="px-3 py-1 bg-[#56C5A6]/20 text-[#56C5A6] text-xs font-semibold rounded-full">In Focus</span>
                    </div>
                    
                    {/* Large Timer */}
                    <div className="text-5xl lg:text-6xl font-bold text-[#A78BFA] mb-4 tracking-tight">
                      18:42
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-3 bg-[#F5F1E8] rounded-full overflow-hidden mb-4 max-w-md mx-auto lg:mx-0">
                      <div className="h-full w-3/4 bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] rounded-full transition-all duration-500" />
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <button className="w-10 h-10 rounded-full bg-[#A78BFA] text-white flex items-center justify-center shadow-md hover:bg-[#9678E8] transition-all duration-200 hover:scale-110 active:scale-95">
                        <Pause className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white border border-border text-muted-foreground flex items-center justify-center hover:bg-accent transition-all duration-200 hover:scale-110 active:scale-95">
                        <Square className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Productivity Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                {/* Tasks Done */}
                <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center hover:-translate-y-1 transition-transform duration-200">
                  <div className="w-10 h-10 rounded-full bg-[#A78BFA]/20 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-5 h-5 text-[#A78BFA]" />
                  </div>
                  <div className="text-3xl font-bold text-[#A78BFA] mb-1">8</div>
                  <div className="text-xs text-muted-foreground font-medium">Tasks Done</div>
                </div>
                
                {/* Focus Time */}
                <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center hover:-translate-y-1 transition-transform duration-200">
                  <div className="w-10 h-10 rounded-full bg-[#FFB8A1]/20 flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-5 h-5 text-[#FFB8A1]" />
                  </div>
                  <div className="text-3xl font-bold text-[#FFB8A1] mb-1">3.5h</div>
                  <div className="text-xs text-muted-foreground font-medium">Focus Time</div>
                </div>
                
                {/* Streak Days */}
                <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center hover:-translate-y-1 transition-transform duration-200">
                  <div className="w-10 h-10 rounded-full bg-[#56C5A6]/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-5 h-5 text-[#56C5A6]" />
                  </div>
                  <div className="text-3xl font-bold text-[#56C5A6] mb-1">12</div>
                  <div className="text-xs text-muted-foreground font-medium">Streak Days</div>
                </div>
              </div>

              {/* Task List */}
              <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <h4 className="text-sm font-semibold text-foreground mb-4">Today's Tasks</h4>
                <div className="space-y-3">
                  {[
                    { task: 'Review design mockups', done: true },
                    { task: 'Write blog post', done: true },
                    { task: 'Team standup meeting', done: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                        item.done ? 'bg-[#F5F1E8]/50' : 'bg-[#F9FAFB] border border-border/30 hover:border-[#A78BFA]/30'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          item.done
                            ? 'bg-[#56C5A6] border-[#56C5A6]'
                            : 'border-muted-foreground/30'
                        }`}
                      >
                        {item.done && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span
                        className={`text-sm ${
                          item.done ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wellness Row */}
              <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-sm font-semibold text-foreground">Wellness Today</h4>
                  <span className="text-xs text-muted-foreground">• Great job taking care of yourself! 💪</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {/* Water */}
                  <div className="flex items-center gap-3 bg-[#F9FAFB] rounded-2xl p-4 transition-all duration-200 hover:bg-[#5EEAD4]/10 hover:scale-105 cursor-pointer group">
                    <div className="relative">
                      <svg className="w-12 h-12 -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#5EEAD4" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="31.4" strokeLinecap="round" className="transition-all duration-300" />
                      </svg>
                      <Droplets className="w-5 h-5 text-[#5EEAD4] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Water</div>
                      <div className="text-xs text-muted-foreground">6/8 cups</div>
                    </div>
                  </div>
                  
                  {/* Stretch */}
                  <div className="flex items-center gap-3 bg-[#F9FAFB] rounded-2xl p-4 transition-all duration-200 hover:bg-[#A78BFA]/10 hover:scale-105 cursor-pointer group">
                    <div className="relative">
                      <svg className="w-12 h-12 -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#A78BFA" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="62.8" strokeLinecap="round" className="transition-all duration-300" />
                      </svg>
                      <StretchHorizontal className="w-5 h-5 text-[#A78BFA] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Stretch</div>
                      <div className="text-xs text-muted-foreground">2/4 breaks</div>
                    </div>
                  </div>
                  
                  {/* Move */}
                  <div className="flex items-center gap-3 bg-[#F9FAFB] rounded-2xl p-4 transition-all duration-200 hover:bg-[#FFB8A1]/10 hover:scale-105 cursor-pointer group">
                    <div className="relative">
                      <svg className="w-12 h-12 -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#FFB8A1" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="94.2" strokeLinecap="round" className="transition-all duration-300" />
                      </svg>
                      <Footprints className="w-5 h-5 text-[#FFB8A1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Move</div>
                      <div className="text-xs text-muted-foreground">1/3 walks</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
