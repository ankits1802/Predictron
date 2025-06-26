'use server';

/**
 * @fileOverview AI-powered summaries of probable maintenance requirements.
 *
 * - generateMaintenanceSummary - A function that generates maintenance summaries based on past failure predictions and maintenance logs.
 * - MaintenanceSummaryInput - The input type for the generateMaintenanceSummary function.
 * - MaintenanceSummaryOutput - The return type for the generateMaintenanceSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MaintenanceSummaryInputSchema = z.object({
  failurePredictions: z.string().describe('Past failure predictions.'),
  maintenanceLogs: z.string().describe('Maintenance logs.'),
});
export type MaintenanceSummaryInput = z.infer<typeof MaintenanceSummaryInputSchema>;

const MaintenanceSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of probable maintenance requirements.'),
});
export type MaintenanceSummaryOutput = z.infer<typeof MaintenanceSummaryOutputSchema>;

export async function generateMaintenanceSummary(input: MaintenanceSummaryInput): Promise<MaintenanceSummaryOutput> {
  return maintenanceSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'maintenanceSummaryPrompt',
  input: {schema: MaintenanceSummaryInputSchema},
  output: {schema: MaintenanceSummaryOutputSchema},
  prompt: `You are a maintenance manager. Based on the failure predictions and maintenance logs, generate a summary of probable maintenance requirements.\n\nFailure Predictions: {{{failurePredictions}}}\n\nMaintenance Logs: {{{maintenanceLogs}}}`,
});

const maintenanceSummaryFlow = ai.defineFlow(
  {
    name: 'maintenanceSummaryFlow',
    inputSchema: MaintenanceSummaryInputSchema,
    outputSchema: MaintenanceSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
