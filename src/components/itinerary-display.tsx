'use client';

import { useState } from 'react';
import { TourItineraryOutput } from '@/ai/flows/generate-tour-itinerary';
import { recommendAlternativesAction } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from './ui/button';
import { Wand2 } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { RecommendTourAlternativesOutput } from '@/ai/flows/recommend-tour-alternatives';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type ItineraryDisplayProps = {
  itinerary: TourItineraryOutput;
};

export default function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
    const [preferences, setPreferences] = useState('');
    const [alternatives, setAlternatives] = useState<RecommendTourAlternativesOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGetAlternatives = async () => {
        setIsLoading(true);
        setAlternatives(null);
        const result = await recommendAlternativesAction({
            itinerary: itinerary.itinerary,
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
    <Card className="shadow-lg mt-12 w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-center">Your Personal Itinerary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-stone dark:prose-invert max-w-none whitespace-pre-wrap rounded-md border p-4 font-body">
            {itinerary.itinerary}
        </div>
        
        <Card className="bg-background/50">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Wand2 className="text-accent"/>
                    Looking for something different?
                </CardTitle>
                <CardDescription>
                    Let our AI suggest alternative activities, restaurants, or hotels.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    placeholder="Any preferences? (e.g., 'vegetarian restaurants', 'less walking', 'cheaper hotels')"
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                />
                <Button onClick={handleGetAlternatives} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                    {isLoading ? 'Thinking...' : 'Suggest Alternatives'}
                </Button>

                {isLoading && (
                     <div className="mt-4 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="mt-2 text-sm text-muted-foreground">Finding great alternatives...</p>
                    </div>
                )}

                {alternatives && alternatives.alternatives.length > 0 && (
                    <Alert className="mt-4 animate-fade-in-up">
                        <AlertTitle className="font-headline">Alternative Suggestions</AlertTitle>
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

      </CardContent>
    </Card>
  );
}
