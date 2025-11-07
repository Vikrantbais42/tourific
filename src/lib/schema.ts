import { z } from 'zod';

export const tourItineraryInputSchema = z.object({
  budget: z.coerce.number().positive(),
  days: z.coerce.number().int().positive(),
  location: z.string().min(1),
  tourType: z.string().min(1),
  currency: z.string().optional().default('INR'),
});

export type TourItineraryInput = z.infer<typeof tourItineraryInputSchema>;
