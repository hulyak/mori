import { Timer, Target, BarChart3, Heart, Zap, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Timer,
      title: 'Focus Timer',
      description: 'Pomodoro-style sessions with your companion cheering you on.',
      color: '#A78BFA',
    },
    {
      icon: Target,
      title: 'Task Tracking',
      description: 'Simple task management that celebrates every completion.',
      color: '#5EEAD4',
    },
    {
      icon: BarChart3,
      title: 'Progress Insights',
      description: 'Beautiful visualizations of your productivity journey.',
      color: '#FFB8A1',
    },
    {
      icon: Heart,
      title: 'Mood Check-ins',
      description: "Your companion asks how you're feeling and adapts accordingly.",
      color: '#F472B6',
    },
    {
      icon: Zap,
      title: 'Smart Breaks',
      description: 'Gentle reminders to stretch, hydrate, and recharge.',
      color: '#FBBF24',
    },
    {
      icon: Users,
      title: 'Community',
      description: "Share your companion's adventures with fellow users.",
      color: '#34D399',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Stay Focused
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful productivity tools wrapped in a warm, friendly experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 group border border-border/30"
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
