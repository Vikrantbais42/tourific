'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { TourItineraryOutput } from '@/ai/flows/generate-tour-itinerary';
import { generateItineraryAction } from '@/app/actions';
import ItineraryDisplay from '@/components/itinerary-display';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FlightDetails from '@/components/flight-details';
import Globe from '@/components/globe';

function ItineraryGenerator() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [itinerary, setItinerary] = useState<TourItineraryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState('INR');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const budget = searchParams.get('budget');
    const days = searchParams.get('days');
    const locationParam = searchParams.get('location');
    const tourType = searchParams.get('tourType');
    const currencyParam = searchParams.get('currency');

    if (currencyParam) {
      setCurrency(currencyParam);
    }
    if (locationParam) {
      setLocation(locationParam);
    }

    if (budget && days && locationParam && tourType) {
      const values = {
        budget: Number(budget),
        days: Number(days),
        location: locationParam,
        tourType,
        currency: currencyParam || 'INR',
      };

      const generateItinerary = async () => {
        setIsLoading(true);
        setError(null);
        const result = await generateItineraryAction(values);
        setIsLoading(false);

        if (result.success && result.data) {
          setItinerary(result.data);
          toast({
            title: 'Itinerary Generated!',
            description: 'Your personalized tour plan is ready below.',
          });
        } else {
          setError(result.error || 'An unknown error occurred.');
          toast({
            variant: 'destructive',
            title: 'Error Generating Itinerary',
            description: result.error || 'An unknown error occurred.',
          });
        }
      };

      generateItinerary();
    } else {
        setError("Missing required information to generate an itinerary. Please go back and fill out the form.");
        setIsLoading(false);
    }
  }, [searchParams, toast]);

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isLoading && (
        <div className="text-center flex flex-col items-center justify-center h-96">
          <div className="w-64 h-64">
            <Globe />
          </div>
          <p className="mt-4 text-muted-foreground text-lg">Generating your dream trip...</p>
          <p className="text-sm text-muted-foreground/80">Please wait, this can take a moment.</p>
        </div>
      )}
      {error && !isLoading && (
        <Card className="w-full max-w-2xl mx-auto bg-destructive/10 border-destructive">
            <CardHeader>
                <CardTitle>Generation Failed</CardTitle>
                <CardDescription className="text-destructive-foreground/80">{error}</CardDescription>
            </CardHeader>
        </Card>
      )}
      {itinerary && !isLoading && (
        <div className="animate-fade-in-up space-y-8">
          <ItineraryDisplay itinerary={itinerary} currency={currency} />
          <FlightDetails location={location} currency={currency} />
        </div>
      )}
    </main>
  );
}


export default function ItineraryPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <ItineraryGenerator />
            </Suspense>
            <Footer />
        </>
    )
}
