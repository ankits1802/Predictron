"use client"

import { useState, useEffect } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, Tooltip, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Skeleton } from '@/components/ui/skeleton';
import type { FailurePredictionPoint } from '@/types';


const chartConfig = {
  probability: {
    label: "Failure Probability",
    color: "hsl(var(--destructive))",
  },
  trend: {
    label: "Trend",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function FailureChart() {
  const [data, setData] = useState<FailurePredictionPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/predictions/failure');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch failure predictions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Failure Probability Trend</CardTitle>
        <CardDescription>Predicted failure probability for EQP-003 over the next 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[250px] w-full flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Line
                dataKey="probability"
                type="monotone"
                stroke="var(--color-probability)"
                strokeWidth={3}
                dot={true}
              />
              <Line
                dataKey="trend"
                type="monotone"
                stroke="var(--color-trend)"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
