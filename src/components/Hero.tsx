import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight text-balance">
                Work never felt this{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#5EEAD4]">
                  cozy
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Meet your digital companion that keeps you company, celebrates your wins, and makes remote work feel a little less lonely.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 bg-[#A78BFA] hover:bg-[#9678E8]"
              >
                Try for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('how-it-works')}
                className="rounded-full px-8 py-6 text-base border-2 hover:bg-accent transition-all"
              >
                See How It Works
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A78BFA]/20 to-[#5EEAD4]/20 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-sm">👤</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">2,000+</span> happy companions
              </div>
            </div>
          </div>

          {/* Right Illustration - Product Mockup */}
          <div className="relative">
            <div className="relative max-w-lg mx-auto">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A78BFA]/20 via-[#5EEAD4]/20 to-[#F5F1E8]/20 rounded-[3rem] blur-3xl" />
              
              {/* Main Card */}
              <div className="relative bg-white rounded-[2rem] shadow-2xl p-6 lg:p-8 border border-border/50">
                {/* Buddy Character with Speech Bubble */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Buddy */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-lg border-2 border-[#A78BFA]/30">
                      <img 
                        src="/puppy.png" 
                        alt="Buddy - Your digital companion" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
                  </div>
                  
                  {/* Speech Bubble */}
                  <div className="flex-1 bg-gradient-to-r from-[#A78BFA]/10 to-[#5EEAD4]/10 rounded-2xl p-4 relative">
                    <p className="text-sm font-medium text-foreground">
                      "You're doing amazing! 🎉"
                    </p>
                    <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-[#A78BFA]/10 border-b-8 border-b-transparent" />
                  </div>
                </div>

                {/* Focus Session */}
                <div className="bg-[#F5F1E8]/50 rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-foreground">Focus Session</span>
                    <span className="text-2xl font-bold text-[#A78BFA]">25:00</span>
                  </div>
                  <div className="h-2.5 bg-white rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] rounded-full" />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#A78BFA]/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#A78BFA]">12</div>
                    <div className="text-xs text-muted-foreground font-medium">Tasks Done</div>
                  </div>
                  <div className="bg-[#5EEAD4]/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#5EEAD4]">4h</div>
                    <div className="text-xs text-muted-foreground font-medium">Focus Time</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#5EEAD4]/20 rounded-2xl rotate-12 blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#A78BFA]/20 rounded-2xl -rotate-12 blur-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
