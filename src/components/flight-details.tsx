'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Plane, Wallet, Clock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FlightDetailsOutput } from '@/ai/flows/generate-flight-details';
import { generateFlightDetailsAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type FlightDetailsProps = {
  location: string;
  currency: string;
};

const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
};

export default function FlightDetails({ location, currency }: FlightDetailsProps) {
  const [flights, setFlights] = useState<FlightDetailsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const currencySymbol = currencySymbols[currency] || currency;

  const handleGetFlights = async () => {
    setIsLoading(true);
    setFlights(null);
    const result = await generateFlightDetailsAction({ location, currency });
    setIsLoading(false);

    if (result.success && result.data) {
      setFlights(result.data);
      toast({
        title: 'Flight Suggestions Ready!',
        description: 'Here are some sample flights for your trip.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Getting Flights',
        description: result.error || 'Could not fetch flight suggestions.',
      });
    }
  };

  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Plane className="text-accent" />
          Find Flights
        </CardTitle>
        <CardDescription>
          Get sample flight details for your trip to {location}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!flights && (
            <Button onClick={handleGetFlights} disabled={isLoading}>
                <Plane className="mr-2 h-4 w-4" />
                {isLoading ? 'Searching for flights...' : 'Show Flight Options'}
            </Button>
        )}

        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-sm text-muted-foreground">Fetching flight data...</p>
          </div>
        )}

        {flights && flights.flights.length > 0 && (
          <div className="space-y-4 animate-fade-in-up">
            <Alert className="bg-background">
                <AlertTitle className="font-poppins flex items-center gap-2">
                    <Plane className="text-accent"/>Sample Flight Options
                </AlertTitle>
                <AlertDescription>These are illustrative examples. Prices and availability are subject to change.</AlertDescription>
            </Alert>
            <div className="space-y-4">
                {flights.flights.map((flight, index) => (
                    <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="md:col-span-2">
                                <p className="font-semibold text-lg text-primary">{flight.airline}</p>
                                <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div>
                                    <p className="font-semibold">{new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    <p className="text-xs text-muted-foreground">Departure</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold">{new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    <p className="text-xs text-muted-foreground">Arrival</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span>{flight.duration}</span>
                                </div>
                                 <div className="text-sm">{flight.stops} stop{flight.stops !== 1 ? 's' : ''}</div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold">{currencySymbol}{flight.price.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">Round trip</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
