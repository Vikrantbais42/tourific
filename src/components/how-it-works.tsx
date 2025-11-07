import { ClipboardList, Wand2, Plane } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const steps = [
  {
    icon: <ClipboardList className="w-8 h-8 text-primary" />,
    title: 'Share Your Dream',
    description: "Fill out our simple form with your destination, budget, desired pace, and interests. The more we know, the better we can tailor your trip.",
  },
  {
    icon: <Wand2 className="w-8 h-8 text-primary" />,
    title: 'Get AI-Powered Itinerary',
    description: "Our intelligent AI analyzes your preferences to instantly generate a detailed, day-by-day itinerary packed with activities, sights, and dining options.",
  },
  {
    icon: <Plane className="w-8 h-8 text-primary" />,
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
        <div className="relative">
            <div className="absolute left-1/2 -ml-px w-px bg-border h-full hidden md:block"></div>
            <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-5/12 flex justify-center md:justify-end md:pr-16 order-1 md:order-none">
                        <div className={`text-center ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-background shadow-md mb-4 mx-auto">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                                    {step.icon}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-background rounded-full flex items-center justify-center font-bold text-primary text-xl shadow-md md:hidden">
                        {index + 1}
                    </div>
                    <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-background rounded-full items-center justify-center font-bold text-primary text-xl shadow-md">
                        {index + 1}
                    </div>
                    <div className={`md:w-5/12 md:pl-16 ${index % 2 !== 0 ? 'md:order-first' : ''}`}>
                        <Card className="shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="font-poppins">{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{step.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
}
