"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateMaintenanceSummary } from '@/ai/flows/maintenance-summary';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from 'lucide-react';
import { dummyFailurePredictions, dummyMaintenanceLogs } from '@/lib/dummy-data';
import { Separator } from '@/components/ui/separator';

export function MaintenanceSummary() {
  const [failurePredictions, setFailurePredictions] = useState(dummyFailurePredictions);
  const [maintenanceLogs, setMaintenanceLogs] = useState(dummyMaintenanceLogs);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await generateMaintenanceSummary({ failurePredictions, maintenanceLogs });
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Generating Summary",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>AI-Powered Maintenance Summary</CardTitle>
        <CardDescription>
          Generate a summary of probable maintenance requirements based on failure predictions and logs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="failure-predictions" className="text-sm font-medium">Failure Predictions</label>
            <Textarea
              id="failure-predictions"
              value={failurePredictions}
              onChange={(e) => setFailurePredictions(e.target.value)}
              placeholder="Enter past failure predictions..."
              className="h-48"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="maintenance-logs" className="text-sm font-medium">Maintenance Logs</label>
            <Textarea
              id="maintenance-logs"
              value={maintenanceLogs}
              onChange={(e) => setMaintenanceLogs(e.target.value)}
              placeholder="Enter maintenance logs..."
              className="h-48"
            />
          </div>
        </div>
        <div className="flex justify-center">
            <Button onClick={handleGenerateSummary} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Summary
                    </>
                )}
            </Button>
        </div>
        {(isLoading || summary) && (
          <div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Generated Summary</h3>
              {isLoading ? (
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none p-4 bg-muted rounded-lg border">
                  <p>{summary}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
