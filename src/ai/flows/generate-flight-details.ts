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

export const FlightDetailsInputSchema = z.object({
  location: z.string().describe('The destination location for the flights.'),
  currency: z.string().describe('The currency for the flight prices.'),
});
export type FlightDetailsInput = z.infer<typeof FlightDetailsInputSchema>;

const FlightSchema = z.object({
  airline: z.string().describe('The name of the airline.'),
  flightNumber: z.string().describe('The flight number.'),
  departureTime: z.string().describe('The departure time, including date and time.'),
  arrivalTime: z.string().describe('The arrival time, including date and time.'),
  duration: z.string().describe('The total duration of the flight.'),
  price: z.number().describe('The estimated price of the flight in the specified currency.'),
  stops: z.number().describe('The number of stops during the flight.'),
});

export const FlightDetailsOutputSchema = z.object({
  flights: z.array(FlightSchema).describe('A list of sample flight options.'),
});
export type FlightDetailsOutput = z.infer<typeof FlightDetailsOutputSchema>;

export async function generateFlightDetails(input: FlightDetailsInput): Promise<FlightDetailsOutput> {
  return generateFlightDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlightDetailsPrompt',
  input: { schema: FlightDetailsInputSchema },
  output: { schema: FlightDetailsOutputSchema },
  prompt: `Generate a list of 3 sample round-trip flights for a trip to {{{location}}}.

Provide realistic details for each flight, including airline, flight number, departure and arrival times, duration, a price in {{{currency}}}, and the number of stops.

Ensure the output is a valid JSON object matching the provided schema.
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
