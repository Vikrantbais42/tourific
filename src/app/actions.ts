
'use server';

import { generateTourItinerary } from '@/ai/flows/generate-tour-itinerary';
import { recommendTourAlternatives, RecommendTourAlternativesInput } from '@/ai/flows/recommend-tour-alternatives';
import { getPopularPlaces, PopularPlacesInput } from '@/ai/flows/get-popular-places';
import { generateFlightDetails, FlightDetailsInput } from '@/ai/flows/generate-flight-details';
import { tourItineraryInputSchema, TourItineraryInput } from '@/lib/schema';

async function saveSearchQuery(query: TourItineraryInput) {
  // This is a placeholder for persisting the user's search query to a datastore like Firestore.
  // In a real application, you would initialize your database client here and save the data.
  console.log('Saving search query to datastore:', query);
  // Example: await db.collection('searchQueries').add(query);
  return { success: true };
}

export async function generateItineraryAction(values: unknown) {
  try {
    const validatedInput = tourItineraryInputSchema.parse(values);

    // Persist the user's query
    await saveSearchQuery(validatedInput);

    const result = await generateTourItinerary(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: message };
  }
}

export async function recommendAlternativesAction(input: RecommendTourAlternativesInput) {
    try {
        const result = await recommendTourAlternatives(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, error: message };
    }
}

export async function getPopularPlacesAction(input: PopularPlacesInput) {
    try {
        const result = await getPopularPlaces(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, error: message };
    }
}

export async function generateFlightDetailsAction(input: FlightDetailsInput) {
    try {
        const result = await generateFlightDetails(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, error: message };
    }
}
