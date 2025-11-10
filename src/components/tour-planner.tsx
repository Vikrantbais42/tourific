
'use client';

import { useRouter } from 'next/navigation';
import ItineraryForm from './itinerary-form';
import { useState } from 'react';

export default function TourPlanner() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values: any) => {
    setIsLoading(true);
    const params = new URLSearchParams(values);
    router.push(`/itinerary?${params.toString()}`);
  };

  return (
    <section id="planner" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-[-200px] relative z-20">
            <ItineraryForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
}
