'use client';

import { useState } from 'react';
import { TourItineraryOutput } from '@/ai/flows/generate-tour-itinerary';
import { recommendAlternativesAction } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from './ui/button';
import { Sparkles, Clock, Wallet } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { RecommendTourAlternativesOutput } from '@/ai/flows/recommend-tour-alternatives';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type ItineraryDisplayProps = {
  itinerary: TourItineraryOutput;
  currency: string;
};

const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
};


export default function ItineraryDisplay({ itinerary, currency }: ItineraryDisplayProps) {
    const [preferences, setPreferences] = useState('');
    const [alternatives, setAlternatives] = useState<RecommendTourAlternativesOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const currencySymbol = currencySymbols[currency] || currency;

    const handleGetAlternatives = async () => {
        setIsLoading(true);
        setAlternatives(null);
        // We'll just stringify the itinerary for the alternatives prompt for now.
        const result = await recommendAlternativesAction({
            itinerary: JSON.stringify(itinerary.itinerary, null, 2),
            preferences: preferences,
        });
        setIsLoading(false);

        if (result.success && result.data) {
            setAlternatives(result.data);
            toast({
                title: 'Suggestions Ready!',
                description: 'We have found some alternatives for you.',
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error getting suggestions',
                description: result.error || 'An unknown error occurred.',
            });
        }
    };


  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
            <h1 className="text-4xl font-poppins font-bold tracking-tight">{itinerary.tourTitle}</h1>
            <p className="text-muted-foreground text-lg">Your personalized journey awaits.</p>
        </div>

        <Accordion type="single" collapsible defaultValue="day-1" className="w-full">
            {itinerary.itinerary.map((dayPlan, index) => (
                <AccordionItem value={`day-${index + 1}`} key={index}>
                    <AccordionTrigger className="text-2xl font-poppins font-semibold py-4">Day {dayPlan.day}: {dayPlan.title}</AccordionTrigger>
                    <AccordionContent className="pl-2 space-y-4 border-l-2 border-primary ml-2">
                        {dayPlan.activities.map((activity, actIndex) => (
                            <Card key={actIndex} className="shadow-md hover:shadow-lg transition-shadow ml-4 relative before:content-[''] before:absolute before:left-[-25px] before:top-8 before:w-4 before:h-4 before:bg-primary before:rounded-full before:border-4 before:border-background">
                                <CardHeader>
                                     <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl font-semibold mb-2">{activity.description.split('.')[0]}</CardTitle>
                                         {activity.cost !== undefined && activity.cost > 0 && (
                                            <div className="flex items-center gap-2 text-sm font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                                                <Wallet className="w-4 h-4 text-muted-foreground"/>
                                                <span>{currencySymbol}{activity.cost}</span>
                                            </div>
                                        )}
                                    </div>
                                    <CardDescription className="flex items-center gap-2 pt-1 text-primary">
                                        <Clock className="w-4 h-4"/> <span>{activity.time}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{activity.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
        
        <Card className="bg-secondary/50 border-dashed">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="text-accent"/>
                    Looking for something different?
                </CardTitle>
                <CardDescription>
                    Let our AI suggest alternative activities, restaurants, or hotels based on your preferences.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    placeholder="Any preferences? (e.g., 'vegetarian restaurants', 'less walking', 'cheaper hotels')"
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    className="bg-background"
                />
                <Button onClick={handleGetAlternatives} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isLoading ? 'Thinking...' : 'Suggest Alternatives'}
                </Button>

                {isLoading && (
                     <div className="mt-4 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="mt-2 text-sm text-muted-foreground">Finding great alternatives...</p>
                    </div>
                )}

                {alternatives && alternatives.alternatives.length > 0 && (
                    <Alert className="mt-4 animate-fade-in-up bg-background">
                        <AlertTitle className="font-poppins flex items-center gap-2"><Sparkles className="text-accent" />Alternative Suggestions</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                {alternatives.alternatives.map((alt, index) => (
                                    <li key={index}>{alt}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>

    </div>
  );
}
