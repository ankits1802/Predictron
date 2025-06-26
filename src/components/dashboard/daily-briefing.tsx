"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { generateDailyBriefing } from "@/ai/flows/daily-briefing-flow";
import { AlertTriangle, Sunrise } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ParseMarkdown = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
    </>
  );
};

export function DailyBriefing() {
  const [briefing, setBriefing] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBriefing = async () => {
      try {
        const result = await generateDailyBriefing();
        setBriefing(result.briefing);
      } catch (error) {
        console.error("Failed to generate daily briefing:", error);
        toast({
          title: "Error",
          description: "Could not load the AI daily briefing.",
          variant: "destructive",
        });
        setBriefing("The daily briefing could not be generated at this time.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBriefing();
  }, [toast]);

  return (
    <Card className="shadow-sm bg-card/50 border-primary/20">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="p-2 bg-primary/10 rounded-full">
            <Sunrise className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <CardTitle>Daily AI Briefing</CardTitle>
          <CardDescription>
            A summary of the most important items for today's shift.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            {briefing.split('\n').map((line, index) => {
              if (line.trim() === '') return null;
              const trimmedLine = line.trim();

              if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                const content = trimmedLine.substring(2);
                
                if (content.startsWith('**') && content.endsWith('**')) {
                  return (
                    <div key={index} className="flex items-start">
                      <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 text-destructive shrink-0" />
                      <p><ParseMarkdown text={content} /></p>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="flex items-start pl-6">
                      <span className="mr-2 mt-1.5 shrink-0">&bull;</span>
                      <p className="text-muted-foreground"><ParseMarkdown text={content} /></p>
                    </div>
                  );
                }
              }

              return <p key={index}>{line}</p>;
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
