"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { SensorDataPoint } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
  vibration: {
    label: "Vibration",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function RealtimeChart() {
  const [data, setData] = useState<SensorDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
        try {
            const response = await fetch('/api/sensor-data/initial');
            const initialData = await response.json();
            setData(initialData);
        } catch (error) {
            console.error("Failed to fetch initial sensor data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        const lastDataPoint = prevData[prevData.length - 1];
        if (!lastDataPoint) return prevData;

        const newTime = new Date();
        const lastTime = new Date(lastDataPoint.time);
        // Handle cases where time might not be a valid date object
        const seconds = isNaN(lastTime.getTime()) ? newTime.getSeconds() : lastTime.getSeconds();
        newTime.setSeconds(seconds + 5);


        const newDataPoint: SensorDataPoint = {
          time: newTime.toISOString(),
          temperature: 75 + Math.random() * 10,
          vibration: 1.2 + Math.random() * 0.8,
          pressure: 200 + Math.random() * 15,
        };
        const updatedData = [...prevData.slice(1), newDataPoint];
        return updatedData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const formatTime = (timeStr: string) => {
    try {
      return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return timeStr.slice(-8, -3); // Fallback for invalid date strings
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Real-Time Sensor Data</CardTitle>
        <CardDescription>Live temperature and vibration data from EQP-002.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <div className="h-[250px] w-full flex items-center justify-center">
                <Skeleton className="h-full w-full" />
            </div>
        ) : (
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatTime}
            />
            <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value.toFixed(1)}°C`}
            />
             <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value.toFixed(1)}g`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" formatter={(value, name, props) => (
                <div className="flex flex-col">
                    <div>{formatTime(props.payload.time)}</div>
                    <div style={{color: props.color}}>{props.name}: {typeof value === 'number' && value.toFixed(2)}</div>
                </div>
            )} />} />
            <defs>
                <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-temperature)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-temperature)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="fillVibration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-vibration)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-vibration)" stopOpacity={0.1}/>
                </linearGradient>
            </defs>
            <Area
              dataKey="temperature"
              type="natural"
              fill="url(#fillTemperature)"
              fillOpacity={0.4}
              stroke="var(--color-temperature)"
              yAxisId="left"
              stackId="a"
            />
            <Area
              dataKey="vibration"
              type="natural"
              fill="url(#fillVibration)"
              fillOpacity={0.4}
              stroke="var(--color-vibration)"
              yAxisId="right"
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
