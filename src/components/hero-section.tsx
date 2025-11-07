import Globe from './globe';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Craft Your Perfect Journey
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Tell us your dreams, and we'll weave them into an unforgettable itinerary. With Tourific, your next adventure is just a few clicks away.
                    </p>
                </div>
                <div className="relative h-64 md:h-96">
                    <Globe />
                </div>
            </div>
        </div>
    </section>
  );
}
