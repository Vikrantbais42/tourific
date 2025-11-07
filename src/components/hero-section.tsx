import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
         <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax"
          style={{ backgroundImage: `url(${heroImage.imageUrl})` }}
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-poppins font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Craft Your Perfect Journey
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-200">
          Tell us your dreams, and we'll weave them into an unforgettable itinerary. With Tourific, your next adventure is just a few clicks away.
        </p>
        <div className="mt-10">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold" asChild>
                <Link href="#planner">
                    Get Started <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
