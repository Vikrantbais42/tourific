
'use server';

import { generateTourItinerary } from '@/ai/flows/generate-tour-itinerary';
import { recommendTourAlternatives, RecommendTourAlternativesInput } from '@/ai/flows/recommend-tour-alternatives';
import { getPopularPlaces, PopularPlacesInput } from '@/ai/flows/get-popular-places';
import { generateFlightDetails, FlightDetailsInput } from '@/ai/flows/generate-flight-details';
import { tourItineraryInputSchema, TourItineraryInput } from '@/lib/schema';
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';

async function saveSearchQuery(query: TourItineraryInput) {
  try {
    const { firestore, auth } = initializeFirebase();
    const user = auth.currentUser;

    if (user) {
      const searchQuery = {
        ...query,
        userProfileId: user.uid,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(firestore, `users/${user.uid}/search_queries`), searchQuery);
      return { success: true };
    } else {
      console.log('Anonymous user, not saving search query.');
      return { success: true };
    }
  } catch (error) {
    console.error('Error saving search query:', error);
    // Even if saving fails, we should proceed with generating the itinerary
    return { success: false, error: 'Failed to save search history.' };
  }
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
