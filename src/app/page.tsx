
'use client';

import { useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import TourPlanner from '@/components/tour-planner';
import HowItWorks from '@/components/how-it-works';
import FeaturesSection from '@/components/features-section';
import { useFirebase } from '@/firebase';
import { logVisit } from '@/lib/services/user-service';
import PopularItineraries from '@/components/popular-itineraries';
// import PopularDestinations from '@/components/popular-destinations';

export default function Home() {
  const { firestore } = useFirebase();

  useEffect(() => {
    // Log a visit when the homepage is loaded.
    // This is a simple way to track user activity.
    logVisit(firestore);
  }, [firestore]);


  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TourPlanner />
        <PopularItineraries />
        <HowItWorks />
        {/* <PopularDestinations /> */}
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
