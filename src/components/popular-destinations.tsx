'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getPopularPlacesAction } from '@/app/actions';
import { PopularPlacesOutput } from '@/ai/flows/get-popular-places';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Search } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  location: z.string().min(2, 'Location is required.'),
});

export default function PopularDestinations() {
  const [places, setPlaces] = useState<PopularPlacesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: 'Paris',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setPlaces(null);
    const result = await getPopularPlacesAction(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setPlaces(result.data);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
  };

  // Fetch initial data for Paris on component mount
  useState(() => {
    onSubmit({ location: 'Paris' });
  });

  return (
    <section id="popular-destinations" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-poppins font-bold tracking-tight sm:text-4xl">
            Find Popular Attractions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Enter a location to discover the most popular places to visit.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl mx-auto flex gap-2 mb-12">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="e.g., Rome, Italy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Discovering amazing places...</p>
          </div>
        )}
        
        {error && (
            <Card className="w-full max-w-2xl mx-auto bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle>Search Failed</CardTitle>
                    <CardDescription className="text-destructive-foreground/80">{error}</CardDescription>
                </CardHeader>
            </Card>
        )}

        {places && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
                {places.places.slice(0, 3).map((place, index) => (
                    <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                         <div className="relative w-full h-56">
                            <Image
                                src={`https://picsum.photos/seed/${place.name.replace(/\s/g, '')}/${index}/600/400`}
                                alt={place.name}
                                fill
                                className="object-cover"
                                data-ai-hint={place.imageHint}
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="font-poppins">{place.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{place.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}

      </div>
    </section>
  );
}
