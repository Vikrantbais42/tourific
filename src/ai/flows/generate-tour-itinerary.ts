'use server';

/**
 * @fileOverview Generates a personalized tour itinerary based on user preferences.
 *
 * - generateTourItinerary - A function that generates a tour itinerary.
 * - TourItineraryInput - The input type for the generateTourItinerary function.
 * - TourItineraryOutput - The return type for the generateTourItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TourItineraryInputSchema = z.object({
  budget: z.number().describe('The budget for the tour in USD.'),
  days: z.number().describe('The number of days for the tour.'),
  location: z.string().describe('The location for the tour.'),
  tourType: z.string().describe('The type of tour (e.g., adventure, cultural, relaxation).'),
});
export type TourItineraryInput = z.infer<typeof TourItineraryInputSchema>;

const TourItineraryOutputSchema = z.object({
  itinerary: z.string().describe('The generated tour itinerary.'),
});
export type TourItineraryOutput = z.infer<typeof TourItineraryOutputSchema>;

export async function generateTourItinerary(input: TourItineraryInput): Promise<TourItineraryOutput> {
  return generateTourItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTourItineraryPrompt',
  input: {schema: TourItineraryInputSchema},
  output: {schema: TourItineraryOutputSchema},
  prompt: `Generate a personalized tour itinerary for a user based on the following criteria:

Budget: {{{budget}}} USD
Number of Days: {{{days}}}
Location: {{{location}}}
Tour Type: {{{tourType}}}

Create a daily itinerary with activities and estimated costs.  Provide as much detail as possible.
`,
});

const generateTourItineraryFlow = ai.defineFlow(
  {
    name: 'generateTourItineraryFlow',
    inputSchema: TourItineraryInputSchema,
    outputSchema: TourItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
