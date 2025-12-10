import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'What platforms does Mori support?',
      answer: 'Mori is available for macOS, Windows, and as a Chrome extension. We\'re working on mobile apps for iOS and Android.',
    },
    {
      question: 'Can I customize my companion\'s appearance and personality?',
      answer: 'Yes! Pro users can fully customize their companion\'s look, personality traits, and even create multiple companions for different moods or projects.',
    },
    {
      question: 'Does my data stay private?',
      answer: 'Absolutely. All your data is encrypted and stored locally on your device. We never sell or share your personal information. You can export or delete your data anytime.',
    },
    {
      question: 'How does the free trial work?',
      answer: 'Pro users get a 14-day free trial with full access to all features. No credit card required to start. After the trial, you can choose to subscribe or continue with the free plan.',
    },
    {
      question: 'Can I use Mori offline?',
      answer: 'Yes! Most features work offline. Mori will sync progress and updates when you\'re back online.',
    },
    {
      question: 'What if I don\'t like it?',
      answer: 'We offer a 14-day money-back guarantee on all paid plans. If you\'re not happy, just email us and we\'ll refund you—no questions asked.',
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Mori
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-[20px] px-6 border border-border/30 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-200 data-[state=open]:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6 [&[data-state=open]>svg]:text-[#A78BFA] transition-colors duration-200 hover:text-[#A78BFA]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 animate-fade-in-up">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
