"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Equipment } from "@/types";
import { cn } from "@/lib/utils";
import { Thermometer, Zap, Gauge } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

const statusStyles: { [key in Equipment['status']]: string } = {
  Operational: "bg-green-500",
  Warning: "bg-yellow-500",
  Critical: "bg-red-500",
};

export function HealthStatus() {
  const [data, setData] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/equipment/health');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch equipment health:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-3 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-1/3 mb-2" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      {data.map((item) => (
        <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{item.status}</span>
                <div className={cn("h-3 w-3 rounded-full animate-pulse", statusStyles[item.status])} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{item.temperature}°C</div>
              <p className="text-xs text-muted-foreground">Temperature</p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1"><Zap className="h-4 w-4" /> Vibration: {item.vibration} g</div>
              <div className="flex items-center gap-1"><Gauge className="h-4 w-4" /> Pressure: {item.pressure} bar</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
