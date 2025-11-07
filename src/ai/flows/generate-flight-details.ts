'use server';
/**
 * @fileOverview Generates sample flight details for a given location.
 *
 * - generateFlightDetails - A function that generates flight suggestions.
 * - FlightDetailsInput - The input type for the generateFlightDetails function.
 * - FlightDetailsOutput - The return type for the generateFlightDetails function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FlightDetailsInputSchema = z.object({
  location: z.string().describe('The destination location for the flights.'),
  currency: z.string().describe('The currency for the flight prices.'),
});
export type FlightDetailsInput = z.infer<typeof FlightDetailsInputSchema>;

const FlightSchema = z.object({
  airline: z.string().describe('The name of the airline.'),
  flightNumber: z.string().describe('The flight number.'),
  departureTime: z.string().describe('The departure time, including date and time in ISO format.'),
  arrivalTime: z.string().describe('The arrival time, including date and time in ISO format.'),
  duration: z.string().describe('The total duration of the flight (e.g., "8h 30m").'),
  price: z.number().describe('The estimated price of the flight in the specified currency.'),
  stops: z.number().describe('The number of stops during the flight.'),
});

const FlightDetailsOutputSchema = z.object({
  flights: z.array(FlightSchema).describe('A list of 3 realistic, sample flight options.'),
});
export type FlightDetailsOutput = z.infer<typeof FlightDetailsOutputSchema>;

export async function generateFlightDetails(input: FlightDetailsInput): Promise<FlightDetailsOutput> {
  return generateFlightDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlightDetailsPrompt',
  input: { schema: FlightDetailsInputSchema },
  output: { schema: FlightDetailsOutputSchema },
  prompt: `You are a flight booking assistant. Generate 3 realistic, sample flight options for a trip to {{{location}}}.
  
  - The flights should be for a date about two weeks from now.
  - Use common airlines that fly to {{{location}}}.
  - Prices should be in {{{currency}}} and should be realistic for the route.
  - The flight duration should be appropriate for the distance.
  - Vary the number of stops.
  
  Present the flight data clearly according to the output schema.
`,
});

const generateFlightDetailsFlow = ai.defineFlow(
  {
    name: 'generateFlightDetailsFlow',
    inputSchema: FlightDetailsInputSchema,
    outputSchema: FlightDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);