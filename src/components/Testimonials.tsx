export default function Testimonials() {
  const testimonials = [
    {
      quote: "I never thought I'd get emotional about a productivity app, but here we are. My companion genuinely makes work feel less lonely.",
      author: "Sarah Chen",
      role: "Freelance Designer",
      avatar: "👩‍🎨",
      bgColor: "from-[#A78BFA]/20 to-[#C4B5FD]/20",
    },
    {
      quote: "The perfect balance of functional and delightful. It's like having a supportive coworker who never interrupts your flow.",
      author: "Marcus Rodriguez",
      role: "Software Engineer",
      avatar: "👨‍💻",
      bgColor: "from-[#5EEAD4]/20 to-[#99F6E4]/20",
    },
    {
      quote: "As someone who struggles with ADHD, having a companion that celebrates small wins has been genuinely life-changing.",
      author: "Alex Kim",
      role: "Content Creator",
      avatar: "👤",
      bgColor: "from-[#FFB8A1]/20 to-[#FECACA]/20",
    },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by Remote Workers Everywhere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands who've found their perfect work companion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out hover:-translate-y-1 border border-border/30 group"
            >
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-[#A78BFA]/30 transition-transform duration-200 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.bgColor} flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
