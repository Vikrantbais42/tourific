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
  departureTime: z.string().describe('The departure time, including date and time.'),
  arrivalTime: z.string().describe('The arrival time, including date and time.'),
  duration: z.string().describe('The total duration of the flight.'),
  price: z.number().describe('The estimated price of the flight in the specified currency.'),
  stops: z.number().describe('The number of stops during the flight.'),
});

const FlightDetailsOutputSchema = z.object({
  flights: z.array(FlightSchema).describe('A list of sample flight options.'),
});
export type FlightDetailsOutput = z.infer<typeof FlightDetailsOutputSchema>;

// This is a "tool" that simulates calling a live flight data API.
// In a real app, this would be replaced with a call to a service like Skyscanner or Google Flights.
const getFlightData = ai.defineTool(
  {
    name: 'getFlightData',
    description: 'Get a list of sample flight options for a given destination.',
    inputSchema: FlightDetailsInputSchema,
    outputSchema: FlightDetailsOutputSchema,
  },
  async (input) => {
    console.log(`Simulating flight search for: ${input.location}`);
    // In a real implementation, you would fetch this data from a live API.
    // For now, we'll return realistic, hardcoded data.
    const airlines = ['IndiGo', 'Vistara', 'Air India'];
    const flights = Array.from({ length: 3 }, (_, i) => {
        const departure = new Date();
        departure.setDate(departure.getDate() + 14 + i);
        departure.setHours(Math.floor(Math.random() * 12) + 6); // Departure between 6 AM and 6 PM
        const arrival = new Date(departure.getTime() + (Math.random() * 8 + 4) * 60 * 60 * 1000); // 4-12 hour flight

        return {
            airline: airlines[i % airlines.length],
            flightNumber: `${airlines[i % airlines.length].substring(0,2).toUpperCase()}${Math.floor(Math.random() * 900) + 100}`,
            departureTime: departure.toISOString(),
            arrivalTime: arrival.toISOString(),
            duration: `${Math.floor((arrival.getTime() - departure.getTime()) / (1000 * 60 * 60))}h ${Math.floor(((arrival.getTime() - departure.getTime()) % (1000 * 60 * 60)) / (1000 * 60))}m`,
            price: Math.floor(Math.random() * 15000) + 5000,
            stops: Math.floor(Math.random() * 2),
        }
    });
    return { flights };
  }
);


export async function generateFlightDetails(input: FlightDetailsInput): Promise<FlightDetailsOutput> {
  return generateFlightDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlightDetailsPrompt',
  input: { schema: FlightDetailsInputSchema },
  output: { schema: FlightDetailsOutputSchema },
  tools: [getFlightData], // Provide the tool to the AI
  prompt: `You are a flight booking assistant. Use the getFlightData tool to find flight options for the user's trip to {{{location}}}.
  
  Present the flight data clearly to the user. Do not invent any flights, only use the data provided by the tool.
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
