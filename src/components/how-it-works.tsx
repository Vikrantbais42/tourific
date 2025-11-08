import { ClipboardList, Wand2, Plane } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardList className="w-8 h-8 text-accent" />,
    title: 'Share Your Dream',
    description: "Fill out our simple form with your destination, budget, desired pace, and interests. The more we know, the better we can tailor your trip.",
  },
  {
    icon: <Wand2 className="w-8 h-8 text-accent" />,
    title: 'Get AI-Powered Itinerary',
    description: "Our intelligent AI analyzes your preferences to instantly generate a detailed, day-by-day itinerary packed with activities, sights, and dining options.",
  },
  {
    icon: <Plane className="w-8 h-8 text-accent" />,
    title: 'Customize & Travel',
    description: "Review your plan, request AI-powered alternatives for any part you wish to change, and once it's perfect, pack your bags and embark on your adventure!",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-poppins font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get your personalized travel plan in three simple steps.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
                <div key={index} className="text-center">
                     <div className="flex items-center justify-center w-20 h-20 rounded-full bg-background shadow-md mb-4 mx-auto">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 relative">
                            {step.icon}
                            <span className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-accent text-accent-foreground rounded-full font-bold text-sm">
                                {index + 1}
                            </span>
                        </div>
                    </div>
                    <h3 className="text-xl font-poppins font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
