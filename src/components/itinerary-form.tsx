'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Users, Home, Heart, Sparkles } from 'lucide-react';

const formSchema = z.object({
  budget: z.coerce.number().min(1, 'Budget is required.'),
  days: z.coerce.number().int().min(1, 'Number of days must be at least 1.'),
  location: z.string().min(2, 'Location is required.'),
  tourType: z.string().min(1, 'Please select a tour type.'),
  currency: z.string().optional(),
});

type ItineraryFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

export default function ItineraryForm({ onSubmit, isLoading }: ItineraryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      tourType: '',
      currency: 'INR',
    },
  });

  return (
    <Card className="shadow-lg border-2 border-primary/20">
        <CardHeader className="text-center">
            <CardTitle className="font-poppins text-2xl">Plan Your Next Adventure</CardTitle>
            <CardDescription>Fill out the details below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Paris, France" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="tourType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Type of Tour</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a tour type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="solo">
                                <div className="flex items-center gap-2"><User /> Solo Trip</div>
                            </SelectItem>
                            <SelectItem value="friends">
                                <div className="flex items-center gap-2"><Users /> Friends Trip</div>
                            </SelectItem>
                            <SelectItem value="family">
                                <div className="flex items-center gap-2"><Home /> Family Trip</div>
                            </SelectItem>
                             <SelectItem value="honeymoon">
                                <div className="flex items-center gap-2"><Heart /> Honeymoon Trip</div>
                            </SelectItem>
                             <SelectItem value="couple">
                                <div className="flex items-center gap-2"><Users /> Couple Trip</div>
                            </SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="days"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Number of Days</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 7" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem className="w-1/3">
                                <FormLabel>Currency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="INR">INR</SelectItem>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="GBP">GBP</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                            <FormLabel>Budget</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 50000" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6">
                    {isLoading ? 'Generating...' : 'Create My Itinerary'}
                    <Sparkles className="ml-2 h-5 w-5" />
                </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
