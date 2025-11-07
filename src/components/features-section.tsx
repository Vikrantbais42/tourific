import { CalendarDays, Sparkles, DollarSign, Map } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <CalendarDays className="h-8 w-8" />,
    name: 'Personalized Itineraries',
    description: 'From activity-packed adventures to relaxing getaways, get a plan that is perfectly suited to your travel style.',
    imageId: 'feature-itinerary'
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    name: 'AI-Powered Suggestions',
    description: 'Don\'t like a suggestion? Get instant alternatives for activities, restaurants, and more with a single click.',
    imageId: 'feature-ai'
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    name: 'Budget-Friendly Planning',
    description: 'Our AI considers your budget to suggest affordable options without compromising the quality of your experience.',
    imageId: 'feature-budget'
  },
  {
    icon: <Map className="h-8 w-8" />,
    name: 'Interactive Maps (Coming Soon)',
    description: 'Visualize your journey with interactive maps that pin all your planned stops, making navigation a breeze.',
    imageId: 'feature-map'
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold tracking-tight sm:text-4xl">
                Everything You Need for a Perfect Trip
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Tourific is packed with features to make travel planning effortless and enjoyable.
            </p>
        </div>
        <div className="space-y-16">
            {features.map((feature, index) => {
                const featureImage = PlaceHolderImages.find(p => p.id === feature.imageId);
                const isReversed = index % 2 !== 0;
                return(
                    <div key={feature.name} className={`flex flex-col md:flex-row gap-8 lg:gap-12 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}>
                         {featureImage && (
                            <div className="relative w-full h-80 md:w-1/2 rounded-lg overflow-hidden shadow-xl">
                                <Image
                                    src={featureImage.imageUrl}
                                    alt={featureImage.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={featureImage.imageHint}
                                />
                            </div>
                        )}
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-primary text-primary-foreground rounded-full">{feature.icon}</div>
                                <h3 className="text-2xl font-poppins font-semibold">{feature.name}</h3>
                            </div>
                            <p className="text-lg text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  )
}
