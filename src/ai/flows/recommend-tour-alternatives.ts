'use server';
/**
 * @fileOverview AI-powered tour alternative recommendation flow.
 *
 * - recommendTourAlternatives - A function that provides alternative activity, restaurant, or hotel suggestions.
 * - RecommendTourAlternativesInput - The input type for the recommendTourAlternatives function.
 * - RecommendTourAlternativesOutput - The return type for the recommendTourAlternatives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendTourAlternativesInputSchema = z.object({
  itinerary: z.string().describe('The current tour itinerary.'),
  preferences: z
    .string()
    .optional()
    .describe('The user preferences for alternative suggestions.'),
});
export type RecommendTourAlternativesInput = z.infer<typeof RecommendTourAlternativesInputSchema>;

const RecommendTourAlternativesOutputSchema = z.object({
  alternatives: z
    .array(z.string())
    .describe('A list of alternative activities, restaurants, or hotels.'),
});
export type RecommendTourAlternativesOutput = z.infer<typeof RecommendTourAlternativesOutputSchema>;

export async function recommendTourAlternatives(
  input: RecommendTourAlternativesInput
): Promise<RecommendTourAlternativesOutput> {
  return recommendTourAlternativesFlow(input);
}

const recommendTourAlternativesPrompt = ai.definePrompt({
  name: 'recommendTourAlternativesPrompt',
  input: {schema: RecommendTourAlternativesInputSchema},
  output: {schema: RecommendTourAlternativesOutputSchema},
  prompt: `Given the following itinerary: {{{itinerary}}}, and user preferences: {{{preferences}}}, suggest alternative activities, restaurants, or hotels. Return a list of alternatives.`,
});

const recommendTourAlternativesFlow = ai.defineFlow(
  {
    name: 'recommendTourAlternativesFlow',
    inputSchema: RecommendTourAlternativesInputSchema,
    outputSchema: RecommendTourAlternativesOutputSchema,
  },
  async input => {
    const {output} = await recommendTourAlternativesPrompt(input);
    return output!;
  }
);
