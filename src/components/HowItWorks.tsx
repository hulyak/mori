import { Download, Smile, TrendingUp, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Download,
      title: 'Download & Install',
      description: 'Get started in seconds. Available for Mac, Windows, and as a browser extension.',
      color: '#A78BFA',
    },
    {
      icon: Smile,
      title: 'Meet Your Companion',
      description: "Choose your companion's personality and watch them come to life on your desktop.",
      color: '#5EEAD4',
      showBuddyVariants: true,
    },
    {
      icon: TrendingUp,
      title: 'Work & Grow Together',
      description: 'Your companion celebrates wins, tracks progress, and keeps you motivated all day.',
      color: '#FFB8A1',
    },
  ];

  // Buddy variant colors for step 2
  const buddyVariants = [
    { bg: 'from-[#A78BFA] to-[#C4B5FD]', nose: '#FFB8A1' },
    { bg: 'from-[#5EEAD4] to-[#99F6E4]', nose: '#FFB8A1' },
    { bg: 'from-[#FFB8A1] to-[#FECACA]', nose: '#A78BFA' },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-[#F5F1E8]/30">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your digital companion up and running in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 group"
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${step.color}20` }}
              >
                <step.icon className="w-8 h-8" style={{ color: step.color }} />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
