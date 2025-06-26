
'use server';
/**
 * @fileOverview A conversational AI assistant for the ProactiveShield system.
 *
 * - chatWithAssistant - The main function to interact with the assistant.
 * - AssistantInput - The input type for the assistant.
 * - AssistantOutput - The return type for the assistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { allTools } from '@/ai/tools';


// Main flow
const systemPrompt = `You are ProactiveShield AI, an expert assistant for a predictive maintenance system.
Your role is to provide clear, concise, and helpful information to maintenance managers and engineers.
Use the available tools to answer questions about equipment health, anomaly alerts, failure predictions, and maintenance history.
When presenting data, format it in a readable way (e.g., using lists or summarizing key points).
Be proactive. If you see a critical issue in the data (like a high failure probability or a critical alert), highlight it to the user even if they didn't ask directly about it.
Do not make up information. If the tools do not provide the answer, state that the information is not available.
If a user asks a general greeting, respond kindly and briefly explain what you can help with.`;


const AssistantInputSchema = z.object({
    query: z.string().describe("The user's question or prompt."),
});
export type AssistantInput = z.infer<typeof AssistantInputSchema>;

const AssistantOutputSchema = z.object({
    response: z.string().describe("The AI assistant's response."),
});
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;


const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: input.query,
      model: 'googleai/gemini-2.0-flash',
      tools: allTools,
      system: systemPrompt,
    });

    return { response: llmResponse.text };
  }
);


export async function chatWithAssistant(input: AssistantInput): Promise<AssistantOutput> {
  return assistantFlow(input);
}
