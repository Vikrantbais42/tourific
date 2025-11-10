'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';


const popularLocations = [
  {
    location: 'Paris, France',
    tagline: 'The city of love and lights.',
    imageHint: 'Eiffel Tower',
    itineraryParams: { budget: 2000, days: 5, tourType: 'couple', currency: 'USD' },
    seed: 20,
  },
  {
    location: 'Kyoto, Japan',
    tagline: 'Ancient temples & serene gardens.',
    imageHint: 'Japanese temple',
    itineraryParams: { budget: 2500, days: 7, tourType: 'solo', currency: 'USD' },
    seed: 21,
  },
  {
    location: 'Rome, Italy',
    tagline: 'Explore the heart of an empire.',
    imageHint: 'Colosseum Rome',
    itineraryParams: { budget: 1800, days: 4, tourType: 'family', currency: 'EUR' },
    seed: 22,
  },
  {
    location: 'Bali, Indonesia',
    tagline: 'Island paradise for every soul.',
    imageHint: 'Bali beach',
    itineraryParams: { budget: 1500, days: 10, tourType: 'honeymoon', currency: 'USD' },
    seed: 23,
  },
  {
    location: 'New York, USA',
    tagline: 'The city that never sleeps.',
    imageHint: 'New York skyline',
    itineraryParams: { budget: 3000, days: 6, tourType: 'friends', currency: 'USD' },
    seed: 24,
  },
  {
    location: 'Cairo, Egypt',
    tagline: 'Walk among pharaohs and pyramids.',
    imageHint: 'Egypt pyramids',
    itineraryParams: { budget: 1200, days: 5, tourType: 'adventure', currency: 'USD' },
    seed: 25,
  },
  {
    location: 'Rio de Janeiro, Brazil',
    tagline: 'Vibrant culture and stunning views.',
    imageHint: 'Rio de Janeiro',
    itineraryParams: { budget: 1700, days: 7, tourType: 'friends', currency: 'USD' },
    seed: 26,
  },
  {
    location: 'Sydney, Australia',
    tagline: 'Iconic landmarks and sunny beaches.',
    imageHint: 'Sydney Opera House',
    itineraryParams: { budget: 2800, days: 8, tourType: 'family', currency: 'USD' },
    seed: 27,
  },
];

export default function PopularItineraries() {
  const router = useRouter();
  const bgImage = PlaceHolderImages.find(p => p.id === 'popular-itineraries-bg');

  const handleCardClick = (location: string, params: any) => {
    const query = new URLSearchParams({
        ...params,
        location,
    });
    router.push(`/itinerary?${query.toString()}`);
  };

  return (
    <section 
        className="py-16 sm:py-24 bg-cover bg-center relative"
        style={{ backgroundImage: bgImage ? `url(${bgImage.imageUrl})` : '' }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-poppins font-bold tracking-tight sm:text-4xl">
            Popular Itineraries
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get inspired by our most popular travel plans.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularLocations.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={() => handleCardClick(item.location, item.itineraryParams)}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={`https://picsum.photos/seed/${item.seed}/400/300`}
                  alt={`Image of ${item.location}`}
                  fill
                  className="object-cover"
                  data-ai-hint={item.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-poppins font-bold text-white">{item.location}</h3>
                  <p className="text-sm text-gray-200">{item.tagline}</p>
                </div>
              </div>
              <CardContent className="p-4 bg-background/80">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span className="font-semibold">{item.itineraryParams.days} Days</span>
                    <span>{item.itineraryParams.currency} {item.itineraryParams.budget}</span>
                </div>
                <Button variant="link" className="p-0 h-auto mt-2 text-accent group-hover:underline">
                    View Plan <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
