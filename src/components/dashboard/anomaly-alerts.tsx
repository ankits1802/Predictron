"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { type Alert } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const severityVariant: { [key in Alert['severity']]: 'destructive' | 'secondary' | 'outline' } = {
    High: "destructive",
    Medium: "secondary",
    Low: "outline"
};


export function AnomalyAlerts() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await fetch('/api/alerts');
                const data = await response.json();
                setAlerts(data);
            } catch (error) {
                console.error("Failed to fetch alerts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAlerts();
    }, []);

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Anomaly Alerts</CardTitle>
                <CardDescription>Recent unusual behavior detected in equipment.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Equipment</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead className="text-right">Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            [...Array(4)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-5 w-24" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            alerts.map((alert) => (
                                <TableRow key={alert.id}>
                                    <TableCell>
                                        <div className="font-medium">{alert.equipmentName}</div>
                                        <div className="text-xs text-muted-foreground">{alert.equipmentId}</div>
                                    </TableCell>
                                    <TableCell>{alert.message}</TableCell>
                                    <TableCell>
                                        <Badge variant={severityVariant[alert.severity]} className="font-semibold">
                                            {alert.severity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{alert.timestamp}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
