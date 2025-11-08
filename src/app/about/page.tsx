import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sailboat, Users, Target } from 'lucide-react';

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(p => p.id === 'feature-itinerary');

    return (
        <>
            <Header />
            <main className="flex-grow bg-background">
                {/* Hero Section */}
                <section className="relative py-24 sm:py-32 text-center bg-secondary">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-poppins font-bold tracking-tight sm:text-5xl lg:text-6xl">About Tourific</h1>
                        <p className="mt-6 text-lg max-w-3xl mx-auto text-muted-foreground">
                            We believe travel should be personal, seamless, and unforgettable. Discover the story behind our revolutionary AI-powered travel planner.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-poppins font-bold tracking-tight sm:text-4xl">Our Story</h2>
                                <p className="text-lg text-muted-foreground">
                                    Tourific was born from a simple frustration: the endless hours spent planning the "perfect" vacation. We dreamed of a smarter way to travel, one where technology could handle the heavy lifting, leaving more time for discovery and enjoyment.
                                </p>
                                <p className="text-lg text-muted-foreground">
                                    We brought together a team of passionate travelers, designers, and AI experts to create a platform that understands your unique travel style. Tourific isn't just about booking flights and hotels; it's about crafting personalized experiences that resonate with your dreams.
                                </p>
                            </div>
                             {aboutImage && (
                                <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-xl">
                                    <div className="relative w-full h-96">
                                        <Image
                                            src={aboutImage.imageUrl}
                                            alt={aboutImage.description}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={aboutImage.imageHint}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                
                {/* Mission and Vision Section */}
                 <section className="py-16 sm:py-24 bg-secondary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                            <div className="space-y-4">
                                <div className="inline-block p-3 bg-primary text-primary-foreground rounded-full">
                                    <Target className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-poppins font-semibold">Our Mission</h3>
                                <p className="text-lg text-muted-foreground">
                                    To empower everyone to travel smarter and experience the world in a more personal and meaningful way. We strive to eliminate the stress of travel planning through intelligent automation, so you can focus on making memories.
                                </p>
                            </div>
                             <div className="space-y-4">
                                <div className="inline-block p-3 bg-primary text-primary-foreground rounded-full">
                                    <Sailboat className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-poppins font-semibold">Our Vision</h3>
                                <p className="text-lg text-muted-foreground">
                                    To become the world's most beloved travel companion, a trusted guide in every traveler's pocket that makes personalized journey creation as easy as dreaming it.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Meet the Team Section */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-poppins font-bold tracking-tight sm:text-4xl">Meet the Innovators</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            We are a diverse group of adventurers and tech enthusiasts united by a love for exploration.
                        </p>
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { name: 'Alex Johnson', role: 'Founder & CEO', imageHint: 'portrait man' },
                                { name: 'Maria Garcia', role: 'Head of AI', imageHint: 'portrait woman' },
                                { name: 'David Chen', role: 'Lead Designer', imageHint: 'portrait person' },
                                { name: 'Sarah Lee', role: 'Travel Expert', imageHint: 'portrait smiling woman' },
                            ].map((member, index) => (
                                <div key={member.name}>
                                    <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden shadow-lg mb-4">
                                        <Image
                                            src={`https://picsum.photos/seed/${index + 10}/200/200`}
                                            alt={`Portrait of ${member.name}`}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={member.imageHint}
                                        />
                                    </div>
                                    <h4 className="text-xl font-poppins font-semibold">{member.name}</h4>
                                    <p className="text-primary">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}