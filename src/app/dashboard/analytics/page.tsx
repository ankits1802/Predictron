
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, YAxis, PieChart, Pie, Cell, Legend } from "recharts"
import { type Equipment, type FailurePredictionPoint } from '@/types';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

const statusColors = {
  Operational: "hsl(var(--chart-2))",
  Warning: "hsl(var(--chart-4))",
  Critical: "hsl(var(--chart-1))",
};


export default function AnalyticsPage() {
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [failureData, setFailureData] = useState<FailurePredictionPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [equipmentRes, failureRes] = await Promise.all([
          fetch('/api/equipment/health'),
          fetch('/api/predictions/failure')
        ]);
        const equipmentJson = await equipmentRes.json();
        const failureJson = await failureRes.json();
        setEquipmentData(equipmentJson);
        setFailureData(failureJson);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const equipmentStatusDistribution = equipmentData.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<Equipment['status'], number>);

  const pieChartData = Object.entries(equipmentStatusDistribution).map(([name, value]) => ({ name, value }));

  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
        <div className="w-full flex-1">
          <h1 className="text-xl font-semibold">Analytics</h1>
        </div>
        <div className="hidden md:block">
            <Button variant="outline" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Equipment Status</CardTitle>
                    <CardDescription>Distribution of operational status across all equipment.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                         <div className="h-[300px] w-full flex items-center justify-center">
                            <Skeleton className="h-full w-full" />
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={statusColors[entry.name as keyof typeof statusColors]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Failure Prediction</CardTitle>
                    <CardDescription>Probability of failure for critical equipment (EQP-003).</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="h-[300px] w-full flex items-center justify-center">
                            <Skeleton className="h-full w-full" />
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={failureData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="date" />
                                <YAxis unit="%" />
                                <Tooltip
                                    contentStyle={{
                                        background: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))"
                                    }}
                                />
                                <Bar dataKey="probability" fill="hsl(var(--primary))" name="Failure Probability" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}
