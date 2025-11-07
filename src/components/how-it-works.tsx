import { ClipboardList, Wand2, Plane } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const steps = [
  {
    icon: <ClipboardList className="w-12 h-12 text-primary" />,
    title: '1. Share Your Dream',
    description: "Fill out our simple form with your destination, budget, desired pace, and interests. The more we know, the better we can tailor your trip.",
  },
  {
    icon: <Wand2 className="w-12 h-12 text-primary" />,
    title: '2. Get AI-Powered Itinerary',
    description: "Our intelligent AI analyzes your preferences to instantly generate a detailed, day-by-day itinerary packed with activities, sights, and dining options.",
  },
  {
    icon: <Plane className="w-12 h-12 text-primary" />,
    title: '3. Customize & Travel',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  {step.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-xl font-poppins">{step.title}</CardTitle>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
