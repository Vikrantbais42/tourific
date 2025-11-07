'use server';
/**
 * @fileOverview Fetches popular tourist attractions for a given location.
 *
 * - getPopularPlaces - A function that returns popular places for a location.
 * - PopularPlacesInput - The input type for the getPopularPlaces function.
 * - PopularPlacesOutput - The return type for the getPopularPlaces function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PopularPlacesInputSchema = z.object({
  location: z.string().describe('The location to find popular places for.'),
});
export type PopularPlacesInput = z.infer<typeof PopularPlacesInputSchema>;

const PlaceSchema = z.object({
    name: z.string().describe('The name of the popular place.'),
    description: z.string().describe('A short, engaging description of the place.'),
    imageHint: z.string().describe('Two or three keywords to find a relevant image for this place, e.g., "Eiffel Tower night".'),
});

const PopularPlacesOutputSchema = z.object({
  places: z.array(PlaceSchema).describe('A list of popular places.'),
});
export type PopularPlacesOutput = z.infer<typeof PopularPlacesOutputSchema>;

export async function getPopularPlaces(input: PopularPlacesInput): Promise<PopularPlacesOutput> {
  return getPopularPlacesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPopularPlacesPrompt',
  input: {schema: PopularPlacesInputSchema},
  output: {schema: PopularPlacesOutputSchema},
  prompt: `You are a travel expert. Based on the following location, provide a list of the top 5 most popular tourist attractions.

Location: {{{location}}}

For each place, provide a name, a short description, and a hint for finding a suitable image.
`,
});

const getPopularPlacesFlow = ai.defineFlow(
  {
    name: 'getPopularPlacesFlow',
    inputSchema: PopularPlacesInputSchema,
    outputSchema: PopularPlacesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
