'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TourItineraryOutput } from '@/ai/flows/generate-tour-itinerary';
import { generateItineraryAction } from '@/app/actions';
import ItineraryForm from './itinerary-form';
import ItineraryDisplay from './itinerary-display';

export default function TourPlanner() {
  const [itinerary, setItinerary] = useState<TourItineraryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (values: any) => {
    setIsLoading(true);
    setItinerary(null);

    const result = await generateItineraryAction(values);

    setIsLoading(false);
    if (result.success && result.data) {
      setItinerary(result.data);
      toast({
        title: 'Itinerary Generated!',
        description: 'Your personalized tour plan is ready below.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Itinerary',
        description: result.error || 'An unknown error occurred.',
      });
    }
  };

  return (
    <section id="planner" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-headline font-bold text-foreground sm:text-4xl">
                Plan Your Next Adventure
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Fill out the details below, and our AI will create a customized itinerary just for you.
            </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
            <ItineraryForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
        {isLoading && (
            <div className="mt-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Generating your dream trip...</p>
            </div>
        )}
        {itinerary && (
            <div className="mt-12 animate-fade-in-up">
                <ItineraryDisplay itinerary={itinerary} />
            </div>
        )}
      </div>
    </section>
  );
}
