'use server';
/**
 * @fileOverview An AI flow to generate a daily briefing for the maintenance team.
 *
 * - generateDailyBriefing - The main function to generate the briefing.
 * - DailyBriefingOutput - The return type for the briefing.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { allTools } from '@/ai/tools';

const DailyBriefingOutputSchema = z.object({
  briefing: z.string().describe("The daily briefing summary."),
});
export type DailyBriefingOutput = z.infer<typeof DailyBriefingOutputSchema>;

const systemPrompt = `You are ProactiveShield AI, acting as a shift supervisor writing a daily briefing. Your audience is the maintenance team.
Start with a general statement about the system status.
Then, using the available tools, identify and list the most critical issues.
Specifically, check for:
1. Any equipment with a 'Critical' status.
2. Any anomaly alerts with 'High' severity.
3. Any equipment with a failure prediction probability over 70%.
For each issue found, provide a bolded markdown summary title. You can also add non-bolded bullet points for details if necessary.
If no critical issues are found, state that the system is stable and there are no immediate concerns.
Keep the entire briefing concise and to the point. Format the output as a markdown list.`;

const dailyBriefingFlow = ai.defineFlow(
  {
    name: 'dailyBriefingFlow',
    inputSchema: z.object({}),
    outputSchema: DailyBriefingOutputSchema,
  },
  async () => {
    const llmResponse = await ai.generate({
      prompt: "Please generate the daily briefing for the maintenance team.",
      model: 'googleai/gemini-2.0-flash',
      tools: allTools,
      system: systemPrompt,
    });

    return { briefing: llmResponse.text };
  }
);

export async function generateDailyBriefing(): Promise<DailyBriefingOutput> {
  return dailyBriefingFlow({});
}
