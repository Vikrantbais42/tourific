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
  budget: z.number().describe('The budget for the tour.'),
  days: z.number().describe('The number of days for the tour.'),
  location: z.string().describe('The location for the tour.'),
  tourType: z.string().describe('The type of tour (e.g., adventure, cultural, relaxation).'),
  currency: z.string().default('INR').describe('The currency for the budget (e.g., INR, USD).'),
});
export type TourItineraryInput = z.infer<typeof TourItineraryInputSchema>;

const ActivitySchema = z.object({
    time: z.string().describe('The time of day for the activity (e.g., "Morning", "Afternoon", "9:00 AM").'),
    description: z.string().describe('A detailed description of the activity.'),
    cost: z.number().optional().describe('The estimated cost of the activity in the specified currency.'),
});

const DayItinerarySchema = z.object({
    day: z.number().describe('The day number of the itinerary (e.g., 1).'),
    title: z.string().describe('A creative and engaging title for the day\'s plan.'),
    activities: z.array(ActivitySchema).describe('A list of activities planned for the day.'),
});

const TourItineraryOutputSchema = z.object({
  itinerary: z.array(DayItinerarySchema).describe('The generated tour itinerary as a list of daily plans.'),
  tourTitle: z.string().describe('A creative and exciting title for the entire tour.'),
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

Budget: {{{budget}}} {{{currency}}}
Number of Days: {{{days}}}
Location: {{{location}}}
Tour Type: {{{tourType}}}

Create a daily itinerary with activities and estimated costs in {{{currency}}}. Ensure the output is a valid JSON object matching the provided schema. Be creative with the titles and descriptions.
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
