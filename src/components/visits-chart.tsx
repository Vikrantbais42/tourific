'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, Tooltip, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type Visit = {
  timestamp: {
    toDate: () => Date;
  };
};

type VisitsChartProps = {
  visits: Visit[] | null;
  isLoading: boolean;
};

// Function to process data
const processVisitData = (visits: Visit[]) => {
  const dailyVisits: { [key: string]: number } = {};

  visits.forEach(visit => {
    // Firestore Timestamps need to be converted to JS Dates
    const date = visit.timestamp.toDate().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    if (!dailyVisits[date]) {
      dailyVisits[date] = 0;
    }
    dailyVisits[date]++;
  });

  return Object.keys(dailyVisits).map(date => ({
    date,
    visits: dailyVisits[date],
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export default function VisitsChart({ visits, isLoading }: VisitsChartProps) {
  if (isLoading || !visits) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Analytics</CardTitle>
          <CardDescription>Loading chart data...</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex justify-center items-center h-72">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = processVisitData(visits);

  const chartConfig = {
    visits: {
      label: 'Visits',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Analytics</CardTitle>
        <CardDescription>Daily visits over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                allowDecimals={false}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="visits"
              type="natural"
              stroke="var(--color-visits)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visits per day
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
